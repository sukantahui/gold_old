import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ManagerService } from '../../../../../../../services/manager.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nitric-gold-form',
  templateUrl: './nitric-gold-form.component.html',
  styleUrls: ['./nitric-gold-form.component.scss']
})
export class NitricGoldFormComponent implements OnInit, OnChanges {

  @Input() selectedYear!: number;
  @Input() selectedMonth!: number;

  private rmId = 45; // ✅ Nitric Gold

  isDev = environment.production === false;
  nitricGoldForm!: FormGroup;
  showDevPanel = false;
  isLoading = false;
  savedData: any[] = [];
  closingBalance: any;

  conversionValue = 0.875;

  constructor(
      private fb: FormBuilder,
      private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.nitricGoldForm.valueChanges.subscribe(() => {
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
    this.nitricGoldForm = this.fb.group({
      closingBalanceOfPreviousMonth: this.createRow(2, 1, 0, 'Opening Balance'),
      transferredToProduction: this.createRow(3, -1, 10),
      returnedFromProduction: this.createRow(4, 1, 20),


      nitricToFine: this.createRow(11, -1, 40),

      lossOfNitric: this.createRow(7, -1, 50, 'Manual Entry'),
      excessOfNitric: this.createRow(8, 1, 60, 'Manual Entry'),

      closingBalance: this.fb.group({
        transaction_particular_id: [1],
        value: [{ value: 0, disabled: true }],
        fine: [{ value: 0, disabled: true }],
        cash: [0],
        rm_id: [45],
        comment: ['Closing Balance (Auto calculated)'],
        tr_date: [new Date().toISOString().substring(0, 10)],
        tr_type: [1],
        order_no: [70]
      })
    });
  }

  createRow(transactionParticularId: number, trType: number, order_no: number, comment = ''): FormGroup {

    const group = this.fb.group({
      transaction_particular_id: [transactionParticularId],
      value: [0],
      fine: [{ value: 0, disabled: true }],
      cash: [0],
      rm_id: [45],
      comment: [comment],
      tr_date: [new Date().toISOString().substring(0, 10)],
      tr_type: [trType],
      order_no: [order_no]
    });

    group.get('value')?.valueChanges.subscribe(val => {
      const value = Number(val) || 0;

      // ⚠️ IMPORTANT: change conversion if Nitric is NOT 92%
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
      recordYear: Number(this.selectedYear),
      recordMonth: Number(this.selectedMonth)
    };

    forkJoin({
      closing: this.managerService.getMonthlyTransactionClosingBalance(payload).pipe(catchError(err => { console.warn('Nitric Gold closing balance error', err); return of({ status: false, data: null }); })),
      transfer: this.managerService.getMonthlyTotalMaterialFromManagerToProductionManager(payload).pipe(catchError(err => { console.warn('Nitric Gold transfer error', err); return of({ status: false, data: null }); })),
      return: this.managerService.getMonthlyTotalMaterialFromProductionManagerToManager(payload).pipe(catchError(err => { console.warn('Nitric Gold return error', err); return of({ status: false, data: null }); })),

      nitricToFine: this.managerService.getMonthlyTotalFineToGiniByManager({
        fromRmId: 45,
        toRmId: 36,
        ...payload
      }).pipe(catchError(err => { console.warn('Nitric Gold nitricToFine error', err); return of({ status: false, data: null }); }))

    }).subscribe({
      next: (res) => {

        // @ts-ignore
        const closing = res.closing?.data?.value || 0;
        this.nitricGoldForm.get('closingBalanceOfPreviousMonth')?.patchValue({
          value: this.format3(closing),
          fine: this.format3(closing * this.conversionValue)
        });

        // return from production
        const returned = res.return?.data?.value || 0;
        this.nitricGoldForm.get('returnedFromProduction')?.patchValue({
          value: this.format3(returned),
          fine: this.format3(returned * this.conversionValue)
        });

        const transfer = res.transfer?.data?.value || 0;
        this.nitricGoldForm.get('transferredToProduction')?.patchValue({
          value: this.format3(transfer),
          fine: this.format3(transfer * this.conversionValue)
        });

        this.nitricGoldForm.get('nitricToFine')?.patchValue({
          value: this.format3(res.nitricToFine?.data?.fromRmTotal || 0),
          fine: this.format3(res.nitricToFine?.data?.toRmTotal || 0),
          comment: res.nitricToFine?.data?.conversionComment
        });

        this.calculateClosingBalance();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('❌ Nitric Gold API Error:', err);
        Swal.fire('Error', 'Failed to load Nitric Gold monthly data', 'error');
      }
    });
  }

  calculateClosingBalance() {
    let totalValue = 0;
    let totalFine = 0;

    Object.keys(this.nitricGoldForm.controls).forEach(key => {

      if (key === 'closingBalance') { return; }

      const group = this.nitricGoldForm.get(key);
      const trType = group?.get('tr_type')?.value;

      if (trType === 0) { return; }

      const value = Number(group?.get('value')?.value) || 0;
      const fine = Number(group?.get('fine')?.value) || 0;

      totalValue += value * trType;
      totalFine += fine * trType;
    });

    this.nitricGoldForm.get('closingBalance')?.patchValue({
      value: this.format3(totalValue),
      fine: this.format3(totalFine)
    }, { emitEvent: false });
  }

  format3(value: any) {
    if (value === null || value === undefined || value === '') { return ''; }
    return Number(value).toFixed(3);
  }
  // under construction
  getPayloadPreview() {
    if (!this.nitricGoldForm) { return {}; }

    const formData = this.nitricGoldForm.getRawValue();

    return {
      records: Object.values(formData).filter((row: any) => row && row.transaction_particular_id !== 2).map((row: any) => ({
        ...row,
        record_year: this.selectedYear,
        record_month: this.selectedMonth
      }))
    };
  }
  submit(): void {

    if (!this.selectedYear || !this.selectedMonth) {
      Swal.fire('Warning', 'Please select year and month', 'warning');
      return;
    }

    const payload = this.getPayloadPreview();

    // 🔔 Confirmation dialog
    Swal.fire({
      title: 'Save Nitric Data',
      text: 'Do you want to submit this monthly data?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {

      if (result.isConfirmed) {

        // @ts-ignore
        this.managerService.saveMonthlyTransactions(payload).subscribe({
          next: (res: any) => {
            Swal.fire('Success', res.message || 'Saved successfully', 'success');
            this.loadSavedData();
          },
          error: (res: any) => {
            console.log('error ', res);
            Swal.fire('Error', 'Something went wrong', 'error');
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
        Swal.fire('Error', 'Failed to load saved data', 'error');
      }
    });
  }

  getMonthName(month: number): string {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || '';
  }

}
