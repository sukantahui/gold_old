import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-petty-cash',
  templateUrl: './petty-cash.component.html',
  styleUrls: ['./petty-cash.component.scss']
})
export class PettyCashComponent implements OnInit {
  expenditureForm: FormGroup;
  constructor() {
    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.expenditureForm = new FormGroup({
      id: new FormControl(null),
      transaction_date: new FormControl(currentSQLDate, [Validators.required]),
      ledger_id: new FormControl(null, [Validators.required]),
      asset_id: new FormControl(1, [Validators.required]),           // purchase
      voucher_number: new FormControl(null),
      amount: new FormControl(0, [Validators.required]),
      voucher_id: new FormControl(2, [Validators.required]),
      particulars: new FormControl(null, [Validators.maxLength(255)]),
      user_id: new FormControl(5, [Validators.required])
    });

  }

  ngOnInit(): void {
  }

}
