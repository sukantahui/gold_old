import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { environment } from '../../../../../../../../environments/environment';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManagerService } from '../../../../../../../services/manager.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-fine-gold-form',
  templateUrl: './fine-gold-form.component.html',
  styleUrls: ['./fine-gold-form.component.scss']
})
export class FineGoldFormComponent implements OnInit, OnChanges {
  @Input() selectedYear!: number;
  @Input() selectedMonth!: number;

  private rmId = 36;
  isDev = environment.production === false;
  FineGoldForm: FormGroup;
  private isLoading = false;
  savedData: any[] = [];
  closingBalance: any;
  showDevPanel = false;

  constructor(
      private fb: FormBuilder,
      private managerService: ManagerService
  ) {}

  createRow(transactionParticularId: number, trType: number, order_no: number, comment = ''): FormGroup {
    return this.fb.group({
      transaction_particular_id: [transactionParticularId],
      fine: [0],
      cash: [0],
      rm_id: [this.rmId],
      comment: [comment],
      tr_date: [new Date().toISOString().substring(0, 10)],
      tr_type: [trType],
      order_no: [order_no]
    });
  }

  ngOnInit(): void {
    this.initializeForm();

    this.FineGoldForm.valueChanges.subscribe(() => {
      this.calculateClosingBalance();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
        (changes.selectedYear || changes.selectedMonth) &&
        this.selectedYear &&
        this.selectedMonth
    ) {
      this.loadMonthlyFineData();
    }
  }

  initializeForm(): void {
    this.FineGoldForm = this.fb.group({
      closingBalanceOfPreviousMonth: this.createRow(2, 1, 0, 'Opening Balance'),
      transferredToProduction: this.createRow(3, -1, 10),
      returnedFromProduction: this.createRow(4, 1, 20),
      fineToGini: this.createRow(5, -1, 30),
      fromGiniToFine: this.createRow(6, 1, 40),
      nitricToFine: this.createRow(11, 1, 50),
      withdrawByOwner: this.createRow(9, -1, 60),
      submitByOwner: this.createRow(10, 1, 70),
      lossOfFine: this.createRow(7, -1, 80, 'Manual Entry'),
      excessOfFine: this.createRow(8, 1, 90, 'Manual Entry'),

      closingBalance: this.fb.group({
        transaction_particular_id: [1],
        fine: [{ value: 0, disabled: true }],
        cash: [0],
        rm_id: [36],
        comment: ['Closing Balance (Auto calculated)'],
        tr_date: [new Date().toISOString().substring(0, 10)],
        tr_type: [1],
        order_no: [200]
      })
    });
  }

  format3(value: any) {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    return Number(value).toFixed(3);
  }

  loadMonthlyFineData(): void {
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
      fineToGini: this.managerService.getMonthlyTotalFineToGiniByManager({
        fromRmId: 36, toRmId: 48, ...payload
      }),
      giniToFine: this.managerService.getMonthlyTotalGiniToFineByManager({
        fromRmId: 48, toRmId: 36, ...payload
      }),
      nitricToFine: this.managerService.getMonthlyTotalNitricToFineByManager({
        fromRmId: 45, toRmId: 36, ...payload
      }),
      withdrawByOwner: this.managerService.getMonthlyTotalMaterialFromManagerToOwner(payload),
      submitByOwner: this.managerService.getMonthlyTotalMaterialFromownerToManager(payload),
    }).subscribe({
      next: (res) => {

        const closing = (res.closing as any)?.data?.value || 0;
        this.FineGoldForm.get('closingBalanceOfPreviousMonth')?.patchValue({
          fine: this.format3(closing)
        });

        const transfer = res.transfer?.data?.value || 0;
        this.FineGoldForm.get('transferredToProduction')?.patchValue({
          fine: this.format3(transfer)
        });

        const returned = res.return?.data?.value || 0;
        this.FineGoldForm.get('returnedFromProduction')?.patchValue({
          fine: this.format3(returned)
        });

        this.FineGoldForm.get('fineToGini')?.patchValue({
          fine: this.format3(res.fineToGini?.data?.fromRmTotal || 0),
          comment: res.fineToGini?.data?.conversionComment
        });

        this.FineGoldForm.get('fromGiniToFine')?.patchValue({
          fine: this.format3(res.giniToFine?.data?.toRmTotal || 0),
          comment: res.giniToFine?.data?.conversionComment
        });
        this.FineGoldForm.get('nitricToFine')?.patchValue({
          fine: this.format3(res.nitricToFine?.data?.toRmTotal || 0),
          comment: res.giniToFine?.data?.conversionComment
        });

        // withdrawn by owner
        const withdrawValue = res.withdrawByOwner?.data?.value || 0;
        this.FineGoldForm.get('withdrawByOwner')?.patchValue({
          fine: this.format3(withdrawValue),
          comment: withdrawValue === 0
              ? 'Nothing withdrawn by owner'
              : 'Withdraw by owner'
        });
        // submit by owner
        const ownerValue = res.submitByOwner?.data?.value || 0;
        this.FineGoldForm.get('submitByOwner')?.patchValue({
          fine: this.format3(ownerValue),
          comment: ownerValue === 0
              ? 'Nothing submitted by owner'
              : 'Submit by owner'
        });

      },
      error: () => {
        Swal.fire('Error', 'Failed to load monthly data', 'error');
      }
    });
  }

  calculateClosingBalance() {
    let totalFine = 0;

    Object.keys(this.FineGoldForm.controls).forEach(key => {

      if (key === 'closingBalance') { return; }

      const group = this.FineGoldForm.get(key);
      if (!group) { return; }

      const trType = group.get('tr_type')?.value;
      if (trType === 0) { return; }

      const fine = Number(group.get('fine')?.value) || 0;
      totalFine += fine * trType;
    });

    this.FineGoldForm.get('closingBalance')?.patchValue({
      fine: this.format3(totalFine)
    }, { emitEvent: false });
  }

  submit(): void {

    if (!this.selectedYear || !this.selectedMonth) {
      Swal.fire('Warning', 'Please select year and month', 'warning');
      return;
    }

    const payload = this.getPayloadPreview();

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit this monthly data?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.managerService.saveMonthlyTransactions(payload).subscribe({
          next: (res: any) => {
            Swal.fire('Success', res.message || 'Saved successfully', 'success');
            this.loadSavedData();
          },
          error: () => {
            Swal.fire('Error', 'Something went wrong', 'error');
          }
        });

      }
    });
  }

  getPayloadPreview() {
    const formData = this.FineGoldForm.getRawValue();

    return {
      records: Object.values(formData)
          .filter((row: any) => row && row.transaction_particular_id !== 2)
          .map((row: any) => ({
            ...row,
            record_year: this.selectedYear,
            record_month: this.selectedMonth
          }))
    };
  }

  loadSavedData() {
    const payload = {
      rmId: this.rmId,
      recordYear: this.selectedYear,
      recordMonth: this.selectedMonth
    };

    this.managerService.getMonthlySavedTransactions(payload).subscribe({
      next: (res: any) => {
        this.savedData = res.data || [];
        this.closingBalance = res.closing_balance || null;
      },
      error: () => {
        Swal.fire('Error', 'Failed to load saved data', 'error');
      }
    });
  }

  copyPayload() {

  }

  toggleDevPanel() {
    this.showDevPanel = !this.showDevPanel;
  }

}
