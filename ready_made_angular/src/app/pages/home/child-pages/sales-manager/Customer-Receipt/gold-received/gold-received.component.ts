import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../../../../../services/customer.service';
import {ReportService} from '../../../../../../services/report.service';
import {ReceiptService} from '../../../../../../services/receipt.service';
import {environment} from '../../../../../../../environments/environment';
import {formatDate} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gold-received',
  templateUrl: './gold-received.component.html',
  styleUrls: ['./gold-received.component.scss']
})
export class GoldReceivedComponent implements OnInit {
  isProduction = environment.production;
  agents: any[];
  customers: any[];
  afterSaveResponse: any = null;
  customerDues: {'gold_due': number, 'lc_due': number};
  goldReceiptForm: FormGroup;
  selectedCustomer: string = null;
  printDivStyle: any;
  goldReceipts: any[];

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private customerService: CustomerService, private reportService: ReportService, private receiptService: ReceiptService) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.goldReceiptResolver.agents.data;
      this.customers = response.goldReceiptResolver.customers.data;
    });
    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.goldReceiptForm = new FormGroup({
      gold_receipt_date: new FormControl(currentSQLDate),
      agent_id: new FormControl(null, [Validators.required]),
      cust_id: new FormControl(null, [Validators.required]),
      rm_id: new FormControl(36, [Validators.required]),
      payment_mode: new FormControl('1', [Validators.required]),
      gold_value: new FormControl(null, [Validators.required]),
      discount: new FormControl(0),
      gold_rate: new FormControl(60000),
      cash: new FormControl(null),
      last_gold_balance: new FormControl(0, [Validators.required]),
      current_gold_balance: new FormControl(0, [Validators.required]),
      current_lc_balance: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  agentSelected() {

  }
  onCustomerSelected($event) {
    this.selectedCustomer = $event.cust_id;
    this.afterSaveResponse = null;
    this.customerService.getCustomerDues($event.cust_id).subscribe(response => {
      console.log('value changed', response.data);
      this.customerDues = response.data;
    });
    this.receiptService.getGoldReceiptsByCustomer(this.selectedCustomer).subscribe((response: {status: string, message: string, data: any[]}) => {
      this.goldReceipts = response.data;
    });
  }
  saveLcReceipt() {
    this.receiptService.saveLcReceipt(this.goldReceiptForm.value)
        .subscribe((response: { status: any, data: any }) => {
          if (response.status === true){
            Swal.fire({
              title: 'Done',
              text: 'LC Received added successfully',
              icon: 'success'
            });
            // tslint:disable-next-line:no-unused-expression
            this.customerDues.lc_due  = this.customerDues.lc_due - this.goldReceiptForm.value.amount;
            console.log(response.data);
            this.afterSaveResponse = response.data;
            this.goldReceiptForm.markAsPristine();
          }
        }, (error) => {
          Swal.fire({
            title: 'Done',
            text: 'Error saving LC',
            icon: 'error'
          });
        });
  }

  resetForm() {
    this.goldReceiptForm.reset();
    this.customerDues = null;
  }

  onLcReceiptSelected(receipts: string) {

  }

  onGoldRateChange(goldRate: HTMLInputElement, cash: HTMLInputElement) {
    console.log('Gold rate', goldRate.value);
    console.log('cash', cash.value);
  }
}
