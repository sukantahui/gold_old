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
  selectedCustomer: any = null;
  goldReceipts: any[];
  showCashEntry = false;

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
      gold_value: new FormControl(null, [Validators.required, Validators.min(0.001)]),
      discount: new FormControl(0),
      gold_rate: new FormControl(60000),
      cash: new FormControl(0),
      last_gold_balance: new FormControl(0, [Validators.required]),
      // current_gold_balance: new FormControl(0, [Validators.required]),
      current_lc_balance: new FormControl(0, [Validators.required]),
    });
  }
  printDivStyle = {
    table: {'border-collapse': 'collapse', width : '100%' },
    label: {width: '100%'},
    th: {border: '1px  solid black' , fontSize : 'small'},
    td: {border: '1px  solid black' , fontSize : 'small'},
    noPrint: { display: 'none' }, // Class to prevent printing
  };

  ngOnInit(): void {
    // this will trigger payment mode change
    this.goldReceiptForm.get('payment_mode').valueChanges.subscribe(val => {
      this.goldReceiptForm.patchValue({ gold_value: null});
      if (val === '4'){
        this.showCashEntry = true;
      }else{
        this.showCashEntry = false;
      }
    });
  }

  agentSelected() {

  }
  onCustomerSelected($event) {
    this.selectedCustomer = $event;
    this.afterSaveResponse = null;
    if(!this.selectedCustomer){
      this.customerDues = null;
      this.goldReceipts = null;
      return;
    }
    if (this.selectedCustomer.is_stock_customer === 1){
      this.goldReceiptForm.patchValue({ payment_mode: '5'});
    }else{
      this.goldReceiptForm.patchValue({ payment_mode: '1'});
    }
    this.customerService.getCustomerDues($event.cust_id).subscribe(response => {
      this.customerDues = response.data;
      this.goldReceiptForm.patchValue({ last_gold_balance: this.customerDues.gold_due, current_lc_balance: this.customerDues.lc_due});
    });
    this.receiptService.getGoldReceiptsByCustomer($event.cust_id).subscribe((response: {status: string, message: string, data: any[]}) => {
      this.goldReceipts = response.data;

    });
  }
  saveGoldReceipt() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Saving gold received
        this.receiptService.saveGoldReceipt(this.goldReceiptForm.value)
            .subscribe((response: { status: any, data: any }) => {
              if (response.status === true){
                this.customerDues.lc_due  = this.customerDues.lc_due - this.goldReceiptForm.value.amount;
                this.afterSaveResponse = response.data;
                this.goldReceiptForm.markAsPristine();
                this.goldReceipts.unshift(this.afterSaveResponse.gold_receipt);
                this.goldReceiptForm.reset();
                this.customerDues = null;

                Swal.fire({
                  title: '<strong>Gold Receipt Enter Successfully<u>example</u></strong>',
                  icon: 'info',
                  html: `You can use <b>bold text</b>,<a href="#" autofocus>links</a>, and other HTML tags`,
                  showCloseButton: true,
                  showCancelButton: true,
                  focusConfirm: false,
                  confirmButtonText: `<i class="fa fa-thumbs-up"></i> Great!`,
                  confirmButtonAriaLabel: 'Thumbs up, great!',
                  cancelButtonText: `<i class="fa fa-thumbs-down"></i>Cancel`,
                  cancelButtonAriaLabel: 'Thumbs down'
                });
                // tslint:disable-next-line:no-unused-expression

              }
            }, (error) => {
              Swal.fire({
                title: 'Error Saving Gold Received',
                text: 'Error saving Gold Receipt',
                icon: 'error'
              });
            });
        // end of saving

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });

  }

  resetForm() {
    this.goldReceiptForm.reset();
    this.customerDues = null;
  }


  onGoldRateChange(goldRate: HTMLInputElement, cash: HTMLInputElement) {
    console.log('Gold rate', goldRate.value);
    console.log('cash', cash.value);
    if (Number(cash.value) > 0 && Number(goldRate.value) > 0 ) {
      const gold = (Number(cash.value) / (Number(goldRate.value) / 10)).toFixed(3);
      this.goldReceiptForm.patchValue({gold_value: gold});
    }else{
      this.goldReceiptForm.patchValue({gold_value: null});
    }
  }



    onGoldReceiptSelected(receipts: any) {
        this.receiptService.getGoldReceiptDetailsByID(receipts.gold_receipt_id)
            .subscribe((response: { status: any, data: any }) => {
                this.afterSaveResponse = response.data;
            });
    }
}
