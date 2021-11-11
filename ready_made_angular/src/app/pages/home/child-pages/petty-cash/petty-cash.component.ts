import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {AccountService} from '../../../../services/account.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-petty-cash',
  templateUrl: './petty-cash.component.html',
  styleUrls: ['./petty-cash.component.scss']
})
export class PettyCashComponent implements OnInit {
  expenditureForm: FormGroup;
  incomeForm: FormGroup;
  incomeLedgers: any[] = [];
  expenditureLedgers: any[] = [];
  assets: any[] = [];
  constructor(private accountService: AccountService) {
    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.expenditureForm = new FormGroup({
      id: new FormControl(null),
      transactionDate: new FormControl(currentSQLDate, [Validators.required]),
      ledgerId: new FormControl(null, [Validators.required]),
      assetId: new FormControl(1, [Validators.required]),           // purchase
      voucherNumber: new FormControl(null),
      amount: new FormControl(0, [Validators.required]),
      voucherId: new FormControl(2, [Validators.required]),
      particulars: new FormControl(null, [Validators.maxLength(255)]),
      userId: new FormControl(5, [Validators.required])
    });

    this.incomeForm = new FormGroup({
      id: new FormControl(null),
      transactionDate: new FormControl(currentSQLDate, [Validators.required]),
      ledgerId: new FormControl(null, [Validators.required]),
      assetId: new FormControl(1, [Validators.required]),           // purchase
      voucherNumber: new FormControl(null),
      amount: new FormControl(0, [Validators.required]),
      voucherId: new FormControl(1, [Validators.required]),
      particulars: new FormControl(null, [Validators.maxLength(255)]),
      userId: new FormControl(5, [Validators.required])
    });
    this.incomeLedgers = this.accountService.getIncomeLedgers();
    this.expenditureLedgers = this.accountService.getExpenditureLedgers();
    this.assets = this.accountService.getAssets();
  }

  ngOnInit(): void {
    this.accountService.getAssetListener().subscribe((response) => {
      console.log(response);
      this.assets = response ;
    });
    this.accountService.getExpenditureLedgerListener().subscribe((response) => {
      this.expenditureLedgers = response;
    });
  }

  handleTransactionDateChange($event: MatDatepickerInputEvent<unknown>) {
    let val = this.expenditureForm.value.transaction_date;
    val = formatDate(val, 'yyyy-MM-dd', 'en');
    this.expenditureForm.patchValue({transaction_date: val});
  }
  submitExpenditure(){

  }
  submitIncome(){

  }

}
