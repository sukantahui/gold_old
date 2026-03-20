import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import {ManagerService} from '../../../../../../../services/manager.service';
import { environment } from 'src/environments/environment';
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
    if (this.selectedYear && this.selectedMonth) {
      this.loadMonthlyData();
    }

  }

  initializeForm(): void {
    this.NinetyTwoGoldForm = this.fb.group({
      closingBalanceOfPreviousMonth: this.createRow(1, 1, 'Opening Balance'),   // closing balance
      // row2: this.createRow(2, -1),  // Opening Balance
      transferredToProduction: this.createRow(3, -1),  // Trnasfer to Pitam
      returnedFromProduction: this.createRow(4, 1),   // Returned from Pitam
      fineToGini: this.createRow(5, 1),  // From Fine to 92
      fromGiniToFine: this.createRow(6, -1),  // From 92 to Fine
      lossOfGini: this.createRow(7, -1, 'Manual Entry'),  // Loss of Gini
      excessOfGini: this.createRow(8, 1, 'Manual Entry'),  // Loss of Gini
      closingBalance: this.fb.group({
        transaction_particular_id: [1],
        value: [{ value: 0, disabled: true }],
        fine: [{ value: 0, disabled: true }],
        cash: [0],
        rm_id: [48],
        comment: ['Closing Balance (Auto calculated)'],
        tr_date: [new Date().toISOString().substring(0, 10)],
        tr_type: [1]
      })
    });

  }

  createRow(transactionParticularId: number, trType: number, comment = ''): FormGroup {


    const group = this.fb.group({
      transaction_particular_id: [transactionParticularId],
      value: [0],
      fine: [{ value: 0, disabled: true }],
      cash: [0],
      rm_id: [48],
      comment: [comment],
      tr_date: [new Date().toISOString().substring(0, 10)],
      tr_type: [trType]
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
    // fetching closing Balance of Previous month for Opening of Current Month
    this.managerService.getMonthlyTransactionClosingBalance(
        {rmId: this.rmId, recordYear: this.selectedYear, recordMonth: this.selectedMonth}
    ).subscribe((res: any) => {
      if (!res?.data) {
        // reset opening balance
        this.NinetyTwoGoldForm.get('closingBalanceOfPreviousMonth')?.patchValue({
          value: 0,
          fine: 0
        });
        return;
      }
      // Update Opening Balance (closingBalanceOfPreviousMonth)
      const closingBalance = res.data.value;
      this.NinetyTwoGoldForm.get('closingBalanceOfPreviousMonth')?.patchValue({
        value: this.format3(closingBalance),
        fine: this.format3( Number((closingBalance * 0.92).toFixed(2)))
      });

    });

    // fetching gini to pitam, transferredToProduction
    // tslint:disable-next-line:max-line-length
    this.managerService.getMonthlyTotalMaterialFromManagerToProductionManager({rmId: this.rmId, recordYear: this.selectedYear, recordMonth: this.selectedMonth}).subscribe((res: any) => {
        if (!res?.data) {
        // reset manager to production manager
          this.NinetyTwoGoldForm.get('transferredToProduction')?.patchValue({
            value: 0,
            fine: 0
          });
          return;
      }else{
          const managertToProductionManager = res.data.value;
          this.NinetyTwoGoldForm.get('transferredToProduction')?.patchValue({
            value: this.format3(managertToProductionManager),
            fine: this.format3(Number((managertToProductionManager * 0.92).toFixed(2))),
            comment: `${this.format3(managertToProductionManager)} gm gini transferred to Pitam`
          });
      }
    });

    // from production manager to manager, returnedFromProduction
    // tslint:disable-next-line:max-line-length
    this.managerService.getMonthlyTotalMaterialFromProductionManagerToManager({rmId: this.rmId, recordYear: this.selectedYear, recordMonth: this.selectedMonth}).subscribe((res: any) => {
      if (!res?.data) {
        // reset manager to production manager
        this.NinetyTwoGoldForm.get('returnedFromProduction')?.patchValue({
          value: 0,
          fine: 0
        });
        // console.log('No Record Pitam to manager ');
        return;
      }else{
        const receivedValue = res.data.value;
        this.NinetyTwoGoldForm.get('returnedFromProduction')?.patchValue({
          value: this.format3(receivedValue),
          fine: this.format3(Number((receivedValue * 0.92).toFixed(2))),
          comment: `${this.format3(receivedValue)} gm gini received from Pitam`
        });
        // console.log('Pitam to Manager ', res);
      }
    });

    // from fine to gini by manager, fineToGini
    this.managerService.getMonthlyTotalFineToGiniByManager(
        {fromRmId: 36, toRmId: 48, recordYear: this.selectedYear, recordMonth: this.selectedMonth})
        .subscribe((res: any) => {
          if (!res?.data){
            // no record found
            this.NinetyTwoGoldForm.get('fineToGini')?.patchValue({
              value: this.format3(0),
              fine: this.format3(0),
              comment: 'No conversion record'
            });
          }else{
            // record found
            this.NinetyTwoGoldForm.get('fineToGini')?.patchValue({
              value: this.format3(res.data.toRmTotal),
              fine: this.format3(res.data.fromRmTotal),
              comment: `${this.format3(res.data.toRmTotal)} gm gini converted from ${this.format3(res.data.fromRmTotal)} gm fine gold`
            });
          }
    });

    // from 92 to Fine by manager, fromGiniToFine
    this.managerService.getMonthlyTotalFineToGiniByManager(
        {fromRmId: 48, toRmId: 36, recordYear: this.selectedYear, recordMonth: this.selectedMonth})
        .subscribe((res: any) => {
          if (!res?.data){
            // no record found
            this.NinetyTwoGoldForm.get('fromGiniToFine')?.patchValue({
              value: this.format3(0),
              fine: this.format3(0),
              comment: 'No conversion record'
            });
          }else{
            // record found
            this.NinetyTwoGoldForm.get('fromGiniToFine')?.patchValue({
              value: this.format3(res.data.toRmTotal),
              fine: this.format3(res.data.fromRmTotal),
              comment: `${this.format3(res.data.toRmTotal)} gm gini converted from ${this.format3(res.data.fromRmTotal)} gm fine gold`
            });
          }
        });

  } // end of loadMonthlyData
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

  getPayloadPreview() {
    if (!this.NinetyTwoGoldForm) { return {}; }

    const formData = this.NinetyTwoGoldForm.getRawValue();

    return {
      records: Object.values(formData).filter((row: any) => row && row.transaction_particular_id !== 1).map((row: any) => ({
        ...row,
        record_year: this.selectedYear,
        record_month: this.selectedMonth
      }))
    };
  }
}
