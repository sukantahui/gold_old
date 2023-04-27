import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {ReportService} from '../../../../../../services/report.service';
import {CustomerService} from '../../../../../../services/customer.service';
import {ReceiptService} from '../../../../../../services/receipt.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-labour-charge',
  templateUrl: './labour-charge.component.html',
  styleUrls: ['./labour-charge.component.scss']
})
export class LabourChargeComponent implements OnInit {
  selectedCustomer: string;
    // tslint:disable-next-line:max-line-length
  lcReceipts: any[];
  constructor(private route: ActivatedRoute, private customerService: CustomerService, private reportService: ReportService, private receiptService: ReceiptService) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.customerReceiptResolver.agents.data;
      this.customers = response.customerReceiptResolver.customers.data;
    });
    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.lcReceiptForm = new FormGroup({
      lc_receipt_date: new FormControl(currentSQLDate),
      agent_id: new FormControl(null, [Validators.required]),
      cust_id: new FormControl(null, [Validators.required]),
      mode: new FormControl('1', [Validators.required]),
      emp_id: new FormControl(72, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      discount: new FormControl(0),
      cheque_details: new FormControl(null),
    });
  }
  agents: any[];
  customers: any[];
  afterSaveResponse: any = null;
  customerDues: {'gold_due': number, 'lc_due': number};
  isProduction = environment.production;
  lcReceiptForm: FormGroup;
    showChequeDetails = false;

  printDivStyle = {
    table: {'border-collapse': 'collapse', width : '100%' },
    label: {width: '100%'},
    th: {border: '1px  solid black' , fontSize : 'small'},
    td: {border: '1px  solid black' , fontSize : 'small'},

  };

  ngOnInit(): void {
    // this.onLcReceiptFormValueChange();
    this.onPaymentModeValueChanged();
  }

  agentSelected() {

  }




  private onLcReceiptFormValueChange() {
    this.lcReceiptForm.valueChanges.subscribe(val => {
      console.log('value changed', val);
    });
  }
  private onPaymentModeValueChanged() {
    this.lcReceiptForm.get('mode').valueChanges.subscribe(val => {
      if (val === '2'){
        this.showChequeDetails = true;
      }else{
        this.showChequeDetails = false;
      }
    });
  }

  onCustomerSelected($event) {
    this.selectedCustomer = $event.cust_id;
    this.customerService.getCustomerDues($event.cust_id).subscribe(response => {
      console.log('value changed', response.data);
      this.customerDues = response.data;
    });
    this.receiptService.getLcReceiptsByCustomer(this.selectedCustomer)
        .subscribe((response: {status: string, message: string, data: any[]}) => {
      this.lcReceipts = response.data;
    });
  }

  saveLcReceipt() {
    this.receiptService.saveLcReceipt(this.lcReceiptForm.value)
        .subscribe((response: { status: any, data: any }) => {
          if (response.status === true){
            Swal.fire({
              title: 'Done',
              text: 'LC Received added successfully',
              icon: 'success'
            });
            // tslint:disable-next-line:no-unused-expression
            this.customerDues.lc_due  = this.customerDues.lc_due - this.lcReceiptForm.value.amount;
            console.log(response.data);
            this.afterSaveResponse = response.data;
            this.lcReceiptForm.markAsPristine();
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
    this.lcReceiptForm.reset();
    this.customerDues = null;
  }
}
