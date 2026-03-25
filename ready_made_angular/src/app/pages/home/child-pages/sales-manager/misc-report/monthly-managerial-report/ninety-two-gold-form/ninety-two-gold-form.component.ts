import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import {ManagerService} from '../../../../../../../services/manager.service';
import { environment } from 'src/environments/environment';
interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

interface ClosingData {
  value: number;
  fine: number;
}

@Component({
  selector: 'app-ninety-two-gold-form',
  templateUrl: './ninety-two-gold-form.component.html',
  styleUrls: ['./ninety-two-gold-form.component.scss']
})
export class NinetyTwoGoldFormComponent implements OnInit, OnChanges {

  @Input() selectedYear!: number;
  @Input() selectedMonth!: number;
  private rmId = 48;
  isDev = environment.production === false;
  NinetyTwoGoldForm!: FormGroup;
  showDevPanel = false;
  isLoading = false;

  constructor(
      private fb: FormBuilder,
      private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.NinetyTwoGoldForm.valueChanges.subscribe(() => {
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
    this.NinetyTwoGoldForm = this.fb.group({
      closingBalanceOfPreviousMonth: this.createRow(2, 1, 0, 'Opening Balance'),   // closing balance
      // row2: this.createRow(2, -1),  // Opening Balance
      transferredToProduction: this.createRow(3, -1, 10),  // Trnasfer to Pitam
      returnedFromProduction: this.createRow(4, 1, 20),   // Returned from Pitam
      fineToGini: this.createRow(5, 1, 30),  // From Fine to 92
      fromGiniToFine: this.createRow(6, -1, 40),  // From 92 to Fine
      lossOfGini: this.createRow(7, -1, 50, 'Manual Entry'),  // Loss of Gini
      excessOfGini: this.createRow(8, 1, 60, 'Manual Entry'),  // Loss of Gini
      closingBalance: this.fb.group({
        transaction_particular_id: [1],
        value: [{ value: 0, disabled: true }],
        fine: [{ value: 0, disabled: true }],
        cash: [0],
        rm_id: [48],
        comment: ['Closing Balance (Auto calculated)'],
        tr_date: [new Date().toISOString().substring(0, 10)],
        tr_type: [1],
        order_no: [70]
      })
    });

  }

  createRow(transactionParticularId: number, trType: number, order_no: number ,comment = ''): FormGroup {


    const group = this.fb.group({
      transaction_particular_id: [transactionParticularId],
      value: [0],
      fine: [{ value: 0, disabled: true }],
      cash: [0],
      rm_id: [48],
      comment: [comment],
      tr_date: [new Date().toISOString().substring(0, 10)],
      tr_type: [trType],
      order_no: [order_no]
    });

    group.get('value')?.valueChanges.subscribe(val => {

      const value = Number(val) || 0;

      const fineValue = value * 0.92;

      group.get('fine')?.setValue(
          this.format3(fineValue),
          { emitEvent: false }
      );

    });

    return group;
  }

  submit(): void {

    if (!this.selectedYear || !this.selectedMonth) {
      Swal.fire('Warning', 'Please select year and month', 'warning');
      return;
    }

    const formData = this.NinetyTwoGoldForm.getRawValue();

    const payload = {
      records: Object.values(formData).map((row: any) => ({
        ...row,
        record_year: this.selectedYear,
        record_month: this.selectedMonth
      }))
    };

    this.managerService.saveMonthlyTransactions(payload).subscribe({
      next: (res: any) => {
        Swal.fire('Success', res.message || 'Saved successfully', 'success');
      },
      error: () => {
        Swal.fire('Error', 'Something went wrong', 'error');
      }
    });
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
  fineToGini: this.managerService.getMonthlyTotalFineToGiniByManager({
    fromRmId: 36, toRmId: 48, ...payload
  }),
  giniToFine: this.managerService.getMonthlyTotalFineToGiniByManager({
    fromRmId: 48, toRmId: 36, ...payload
  })
}).subscribe({
  next: (res) => {

    console.log('✅ All APIs loaded:', res);

    // 1️⃣ Opening Balance
    const closing = (res.closing as any)?.data?.value || 0;
    this.NinetyTwoGoldForm.get('closingBalanceOfPreviousMonth')?.patchValue({
      value: this.format3(closing),
      fine: this.format3(closing * 0.92)
    });

    // 2️⃣ Transfer
    const transfer = res.transfer?.data?.value || 0;
    this.NinetyTwoGoldForm.get('transferredToProduction')?.patchValue({
      value: this.format3(transfer),
      fine: this.format3(transfer * 0.92)
    });

    // 3️⃣ Return
    const returned = res.return?.data?.value || 0;
    this.NinetyTwoGoldForm.get('returnedFromProduction')?.patchValue({
      value: this.format3(returned),
      fine: this.format3(returned * 0.92)
    });

    // 4️⃣ Fine → Gini
    this.NinetyTwoGoldForm.get('fineToGini')?.patchValue({
      value: this.format3(res.fineToGini?.data?.toRmTotal || 0),
      fine: this.format3(res.fineToGini?.data?.fromRmTotal || 0)
    });

    // 5️⃣ Gini → Fine
    this.NinetyTwoGoldForm.get('fromGiniToFine')?.patchValue({
      value: this.format3(res.giniToFine?.data?.toRmTotal || 0),
      fine: this.format3(res.giniToFine?.data?.fromRmTotal || 0)
    });

    // ✅ Now safe to calculate
    this.calculateClosingBalance();
  },

  error: (err) => {
    console.error('❌ API Error:', err);
    Swal.fire('Error', 'Failed to load monthly data', 'error');
  }
});
}


  // helper methods
  format3(value: any) {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    return Number(value).toFixed(3);
  }

  getTrTypeLabel(groupName: string): string {
    const trType = this.NinetyTwoGoldForm?.get(groupName)?.get('tr_type')?.value;
    return trType === -1 ? 'Less' : 'Add';
  }

  getTrTypeClass(groupName: string): string {
    const trType = this.NinetyTwoGoldForm?.get(groupName)?.get('tr_type')?.value;
    return trType === -1 ? 'text-danger' : 'text-success';
  }

  calculateClosingBalance() {
    let totalValue = 0;
    let totalFine = 0;

    Object.keys(this.NinetyTwoGoldForm.controls).forEach(key => {

      if (key === 'closingBalance') { return; } // skip itself

      const group = this.NinetyTwoGoldForm.get(key);
      if (!group) { return; }

      const trType = group.get('tr_type')?.value;

      // ❌ ignore tr_type = 0
      if (trType === 0) { return; }

      const value = Number(group.get('value')?.value) || 0;
      const fine = Number(group.get('fine')?.value) || 0;

      totalValue += value * trType;
      totalFine += fine * trType;
    });

    this.NinetyTwoGoldForm.get('closingBalance')?.patchValue({
      value: this.format3(totalValue),
      fine: this.format3(totalFine)
    }, { emitEvent: false });
  }
  toggleDevPanel() {
    this.showDevPanel = !this.showDevPanel;
  }
  getPayloadPreview() {
    if (!this.NinetyTwoGoldForm) { return {}; }

    const formData = this.NinetyTwoGoldForm.getRawValue();

    return {
      records: Object.values(formData).filter((row: any) => row && row.transaction_particular_id !== 2).map((row: any) => ({
        ...row,
        record_year: this.selectedYear,
        record_month: this.selectedMonth
      }))
    };
  }

  copyPayload() {
    const payload = this.getPayloadPreview();

    const text = JSON.stringify(payload, null, 2);

    navigator.clipboard.writeText(text).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Copied!',
        text: 'Payload copied to clipboard',
        timer: 1500,
        showConfirmButton: false
      });
    }).catch(() => {
      Swal.fire('Error', 'Failed to copy', 'error');
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
