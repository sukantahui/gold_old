import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-labour-charge',
  templateUrl: './labour-charge.component.html',
  styleUrls: ['./labour-charge.component.scss']
})
export class LabourChargeComponent implements OnInit {
  agents: any[];
  customers: any[];
  isProduction = environment.production;
  LcReceiptForm: FormGroup;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.customerReceiptResolver.agents.data;
      this.customers = response.customerReceiptResolver.customers.data;
    });
    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.LcReceiptForm = new FormGroup({
      lc_receipt_date: new FormControl(currentSQLDate),
      agent_id: new FormControl(null, [Validators.required]),
      cust_id: new FormControl(null, [Validators.required]),
      payment_mode: new FormControl(1, [Validators.required]),
      emp_id: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      discount: new FormControl(0),
      cheque_details: new FormControl(null),
    });
  }

  ngOnInit(): void {
  }

  agentSelected() {

  }
}
