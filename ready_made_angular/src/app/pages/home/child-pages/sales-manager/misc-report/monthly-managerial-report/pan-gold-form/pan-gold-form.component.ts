import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { ManagerService } from '../../../../../../../services/manager.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pan-gold-form',
  templateUrl: './pan-gold-form.component.html',
  styleUrls: ['./pan-gold-form.component.scss']
})
export class PanGoldFormComponent implements OnInit, OnChanges {

  @Input() selectedYear!: number;
  @Input() selectedMonth!: number;

  private rmId = 31; // ✅ Pan

  isDev = environment.production === false;
  panGoldForm!: FormGroup;
  showDevPanel = false;
  isLoading = false;
  savedData: any[] = [];
  closingBalance: any;

  conversionValue = 0.4;

  constructor(
      private fb: FormBuilder,
      private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.panGoldForm.valueChanges.subscribe(() => {
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

    this.panGoldForm = this.fb.group({

      closingBalanceOfPreviousMonth: this.createRow(
          2,
          1,
          0,
          'Opening Balance'
      ),

      transferredToProduction: this.createRow(
          3,
          -1,
          10
      ),

      returnedFromProduction: this.createRow(
          4,
          1,
          20
      ),

      ninetyTwoToPan: this.createRow(
          12,
          1,
          40
      ),

      lossOfPan: this.createRow(
          7,
          -1,
          50,
          'Manual Entry'
      ),

      excessOfPan: this.createRow(
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
        rm_id: [31],
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
      rm_id: [31],
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

      ninetyTwoToPan: this.managerService.getMonthlyTotalFineToGiniByManager({
        fromRmId: 48,
        toRmId: this.rmId,
        ...payload
      })

    }).subscribe({

      next: (res) => {
        // 1️⃣ Opening Balance
        // @ts-ignore
        const closing = res.closing?.data?.value || 0;
        this.panGoldForm.get('closingBalanceOfPreviousMonth')?.patchValue({
          value: this.format3(closing),
          fine: this.format3(closing * this.conversionValue)
        });

        // 2️⃣ Transferred to Production
        const transferredToProduction = res.transfer?.data?.value || 0;
        this.panGoldForm.get('transferredToProduction')?.patchValue({
          value: this.format3(transferredToProduction),
          fine: this.format3(transferredToProduction * this.conversionValue)
        });
        // 3️⃣ Return from Production
        const returned = res.return?.data?.value || 0;
        this.panGoldForm.get('returnedFromProduction')?.patchValue({
          value: this.format3(returned),
          fine: this.format3(returned * this.conversionValue)
        });

        this.panGoldForm.get('ninetyTwoToPan')?.patchValue({
          value: this.format3(res.ninetyTwoToPan?.data?.toRmTotal || 0),
          fine: this.format3(res.ninetyTwoToPan?.data?.fromRmTotal || 0),
          comment: res.ninetyTwoToPan?.data?.conversionComment
        });

        this.calculateClosingBalance();

      },

      error: () => {
        Swal.fire('Error', 'Failed to load monthly data', 'error');
      }

    });

  }

  calculateClosingBalance() {

    let totalValue = 0;
    let totalFine = 0;

    Object.keys(this.panGoldForm.controls).forEach(key => {

      if (key === 'closingBalance') {
        return;
      }

      const group = this.panGoldForm.get(key);

      const trType = group?.get('tr_type')?.value;

      if (trType === 0) {
        return;
      }

      const value = Number(group?.get('value')?.value) || 0;

      const fine = Number(group?.get('fine')?.value) || 0;

      totalValue += value * trType;
      totalFine += fine * trType;

    });

    this.panGoldForm.get('closingBalance')?.patchValue({
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

    if (!this.panGoldForm) {
      return { records: [] };
    }

    const formData = this.panGoldForm.getRawValue();

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

      title: 'Save Pan Data',
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

          error: (res: any) => {

            console.log('error ', res);

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
  copyPayload() {

  }
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
