import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { ManagerService } from '../../../../../../../services/manager.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dal-form',
  templateUrl: './dal-form.component.html',
  styleUrls: ['./dal-form.component.scss']
})
export class DalFormComponent implements OnInit, OnChanges {

  @Input() selectedYear!: number;
  @Input() selectedMonth!: number;

  private rmId = 33; // ✅ Dal

  isDev = environment.production === false;
  dalForm!: FormGroup;
  showDevPanel = false;
  isLoading = false;
  savedData: any[] = [];
  closingBalance: any;

  conversionValue = 0.0;

  constructor(
      private fb: FormBuilder,
      private managerService: ManagerService
  ) {}

  ngOnInit(): void {

    this.initializeForm();

    this.dalForm.valueChanges.subscribe(() => {
      this.calculateClosingBalance();
    });

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
        (changes.selectedYear || changes.selectedMonth) &&
        this.selectedYear &&
        this.selectedMonth
    ) {
      this.loadMonthlyData();
    }

  }

  initializeForm(): void {

    this.dalForm = this.fb.group({
      // Task: 1
      closingBalanceOfPreviousMonth: this.createRow(
          2,
          1,
          0,
          'Opening Balance'
      ),
      // Task: 2
      transferredToProduction: this.createRow(
          3,
          -1,
          10
      ),
      // Task: 3
      returnedFromProduction: this.createRow(
          4,
          1,
          20
      ),
      // Task: 4
      silverToDal: this.createRow(
          13,
          1,
          40
      ),
      dalToPan: this.createRow(
          14,
          -1,
          45
      ),

      lossOfDal: this.createRow(
          7,
          -1,
          50,
          'Manual Entry'
      ),

      excessOfDal: this.createRow(
          8,
          1,
          60,
          'Manual Entry'
      ),

      closingBalance: this.fb.group({

        transaction_particular_id: [1],
        value: [{ value: 0, disabled: true }],
        fine: [{ value: 0, disabled: true }],
        cash: [0],
        rm_id: [33],
        comment: ['Closing Balance (Auto calculated)'],
        tr_date: [new Date().toISOString().substring(0, 10)],
        tr_type: [1],
        order_no: [200]

      })

    });

  }

  createRow(
      transactionParticularId: number,
      trType: number,
      order_no: number,
      comment = ''
  ): FormGroup {

    const group = this.fb.group({

      transaction_particular_id: [transactionParticularId],
      value: [0],
      fine: [{ value: 0, disabled: true }],
      cash: [0],
      rm_id: [33],
      comment: [comment],
      tr_date: [new Date().toISOString().substring(0, 10)],
      tr_type: [trType],
      order_no: [order_no]

    });

    group.get('value')?.valueChanges.subscribe(val => {

      const value = Number(val) || 0;

      const fineValue = value * this.conversionValue;

      group.get('fine')?.setValue(
          this.format3(fineValue),
          { emitEvent: false }
      );

    });

    return group;

  }

  loadMonthlyData(): void {

    this.isLoading = true;

    const payload = {
      rmId: this.rmId,
      recordYear: this.selectedYear,
      recordMonth: this.selectedMonth
    };

    forkJoin({

      closing: this.managerService.getMonthlyTransactionClosingBalance(payload),

      transfer: this.managerService.getMonthlyTotalMaterialFromManagerToProductionManager(payload),

      return: this.managerService.getMonthlyTotalMaterialFromProductionManagerToManager(payload),

      silverToDal: this.managerService.getMonthlyTotalSilverToDalByManager({
        fromRmId: 38,
        toRmId: this.rmId,
        ...payload
      })

    }).subscribe({

      next: (res) => {


        // @ts-ignore
        const closing = res.closing?.data?.value || 0;

        this.dalForm.get('closingBalanceOfPreviousMonth')?.patchValue({
          value: this.format3(closing),
          fine: this.format3(closing * this.conversionValue)
        });

        const transferredToProduction = res.transfer?.data?.value || 0;

        this.dalForm.get('transferredToProduction')?.patchValue({
          value: this.format3(transferredToProduction),
          fine: this.format3(transferredToProduction * this.conversionValue)
        });

        const returned = res.return?.data?.value || 0;

        this.dalForm.get('returnedFromProduction')?.patchValue({
          value: this.format3(returned),
          fine: this.format3(returned * this.conversionValue)
        });

        this.dalForm.get('silverToDal')?.patchValue({
          value: this.format3(res.silverToDal?.data?.toRmTotal || 0),
          fine: this.format3(res.silverToDal?.data?.toRmTotal * this.conversionValue || 0),
          comment: res.silverToDal?.data?.conversionComment
        });

        this.calculateClosingBalance();

      },

      error: () => {

        Swal.fire(
            'Error',
            'Failed to load monthly data',
            'error'
        );

      }

    });

  }

  calculateClosingBalance() {

    let totalValue = 0;
    let totalFine = 0;

    Object.keys(this.dalForm.controls).forEach(key => {

      if (key === 'closingBalance') {
        return;
      }

      const group = this.dalForm.get(key);

      const trType = group?.get('tr_type')?.value;

      if (trType === 0) {
        return;
      }

      const value = Number(group?.get('value')?.value) || 0;

      const fine = Number(group?.get('fine')?.value) || 0;

      totalValue += value * trType;
      totalFine += fine * trType;

    });

    this.dalForm.get('closingBalance')?.patchValue({
      value: this.format3(totalValue),
      fine: this.format3(totalFine)
    }, { emitEvent: false });

  }

  format3(value: any) {

    if (value === null || value === undefined || value === '') {
      return '';
    }

    return Number(value).toFixed(3);

  }

  getPayloadPreview(): { records: any[] } {

    if (!this.dalForm) {
      return { records: [] };
    }

    const formData = this.dalForm.getRawValue();

    return {

      records: Object.values(formData)
          .filter((row: any) =>
              row && row.transaction_particular_id !== 2
          )
          .map((row: any) => ({
            ...row,
            record_year: this.selectedYear,
            record_month: this.selectedMonth
          }))

    };

  }

  submit(): void {

    if (!this.selectedYear || !this.selectedMonth) {

      Swal.fire(
          'Warning',
          'Please select year and month',
          'warning'
      );

      return;

    }

    const payload = this.getPayloadPreview();

    Swal.fire({

      title: 'Save Dal Data',
      text: 'Do you want to submit this monthly data?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'

    }).then((result) => {

      if (result.isConfirmed) {

        this.managerService.saveMonthlyTransactions(payload).subscribe({

          next: (res: any) => {

            Swal.fire(
                'Success',
                res.message || 'Saved successfully',
                'success'
            );

            this.loadSavedData();

          },

          error: () => {

            Swal.fire(
                'Error',
                'Something went wrong',
                'error'
            );

          }

        });

      }

    });

  }

  loadSavedData() {

    this.isLoading = true;

    const payload = {
      rmId: this.rmId,
      recordYear: this.selectedYear,
      recordMonth: this.selectedMonth
    };

    this.managerService.getMonthlySavedTransactions(payload).subscribe({

      next: (res: any) => {

        this.savedData = res.data || [];
        this.closingBalance = res.closing_balance || null;

        this.isLoading = false;

      },

      error: () => {

        this.isLoading = false;

        Swal.fire(
            'Error',
            'Failed to load saved data',
            'error'
        );

      }

    });

  }

  copyPayload() {}

  getMonthName(month: number): string {

    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    return months[month - 1] || '';

  }

  toggleDevPanel() {
    this.showDevPanel = !this.showDevPanel;
  }

}
