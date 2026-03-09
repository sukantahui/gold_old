import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import {ManagerService} from '../../../../../../../services/manager.service';

@Component({
  selector: 'app-ninety-two-gold-form',
  templateUrl: './ninety-two-gold-form.component.html',
  styleUrls: ['./ninety-two-gold-form.component.scss']
})
export class NinetyTwoGoldFormComponent implements OnInit, OnChanges {

  @Input() selectedYear!: number;
  @Input() selectedMonth!: number;
  private rmId = 48;
  NinetyTwoGoldForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedYear && this.selectedMonth) {
      this.loadMonthlyData();
    }

  }

  initializeForm(): void {
    this.NinetyTwoGoldForm = this.fb.group({
      row1: this.createRow(1, 1),
      row2: this.createRow(2, -1),
      row3: this.createRow(3, 1),
      row4: this.createRow(4, -1)
    });
  }

  createRow(transactionParticularId: number, trType: number): FormGroup {

    const group = this.fb.group({
      transaction_particular_id: [transactionParticularId],
      value: [0],
      fine: [{ value: 0, disabled: true }],
      cash: [0],
      rm_id: [48],
      comment: [''],
      tr_date: [new Date().toISOString().substring(0, 10)],
      tr_type: [trType]
    });

    group.get('value')?.valueChanges.subscribe(val => {
      const fineValue = (Number(val) || 0) * 0.92;
      group.get('fine')?.setValue(Number(fineValue.toFixed(2)), { emitEvent: false });
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
    // fetching closing Balance
    this.managerService.getMonthlyTransactionClosingBalance(
        {rmId: this.rmId, recordYear: this.selectedYear, recordMonth: this.selectedMonth}
    ).subscribe((res: any) => {
      if (!res?.data) {
        // reset opening balance
        this.NinetyTwoGoldForm.get('row1')?.patchValue({
          value: 0,
          fine: 0
        });
        return;
      }
      // Update Opening Balance (row1)
      const closingBalance = res.data.value;
      this.NinetyTwoGoldForm.get('row1')?.patchValue({
        value: closingBalance,
        fine: Number((closingBalance * 0.92).toFixed(2))
      });

    });

    // fetching gini to pitam
    // tslint:disable-next-line:max-line-length
    this.managerService.getMonthlyTotalMaterialFromManagerToProductionManager(
        {rmId: this.rmId, recordYear: this.selectedYear, recordMonth: this.selectedMonth}
        ).subscribe((res: any) => {
        if (!res?.data) {
        // reset opening balance
        console.log('No RecordManager to Pitam ');
        return;
      }else{
          console.log('Manager to Pitam ', res);
      }
    });
  } // end of loadMonthlyData

}
