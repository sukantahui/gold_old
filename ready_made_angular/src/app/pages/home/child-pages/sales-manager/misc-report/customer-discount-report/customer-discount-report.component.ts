import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {ReportService} from '../../../../../../services/report.service';
import {CommonService} from '../../../../../../services/common.service';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

@Component({
  selector: 'app-customer-discount-report',
  templateUrl: './customer-discount-report.component.html',
  styleUrls: ['./customer-discount-report.component.scss']
})
export class CustomerDiscountReportComponent implements OnInit {
  isProduction: boolean = environment.production;
  customers: any[] = [];
  bills: any[] = undefined;
  onlyDiscountable = true;
  filtereddBills: any[] = [];
  discountTotal = 0;
  selectedCustomer: any;
  reportForm: UntypedFormGroup;
  quantityTotal = 0;
  lcTotal = 0 ;
  currentCustomerDues: any = undefined;
  endDate: Date;
  stDate: Date;

  constructor(private route: ActivatedRoute, private reportService: ReportService,  public commonService: CommonService) {
    this.route.data.subscribe((response: any) => {
      // console.log(response.customerResolvers.customers.data);
      this.customers = response.customerResolvers.customers.data;
    });


    this.stDate = new Date('2022-04-01');
    this.endDate = new Date('2022-11-30');
    // stDate.setDate(endDate.getDate() - 365);
    this.reportForm = new UntypedFormGroup({
      startDate: new UntypedFormControl(this.stDate),
      startDateSql: new UntypedFormControl(null),
      endDate: new UntypedFormControl(this.endDate),
      endDateSql: new UntypedFormControl(null),
      reportLimit: new UntypedFormControl(50),
      discount: new UntypedFormControl(25)
    });
    this.reportForm.patchValue({startDateSql: this.stDate.getFullYear() + '-' + this.stDate.getMonth() + '-' + this.stDate.getDay()});
    this.reportForm.patchValue({endDateSql: this.endDate.getFullYear() + '-' + this.endDate.getMonth() + '-' + (this.endDate.getDay() + 1)});
  }

  ngOnInit(): void {
  }
  setStartDateSQL(value: string) {
    this.reportForm.patchValue({startDateSql: this.commonService.getSQLDate2(value)});
  }

  setEndDateSQL(value: string) {
    this.reportForm.patchValue({endDateSql: this.commonService.getSQLDate2(value)});
  }

  onSelectedCustomer(customer) {
    this.selectedCustomer = customer;
    this.reportService.getCustomerDiscountById(customer.cust_id, this.reportForm.value.startDateSql, this.reportForm.value.endDateSql, 25).subscribe((response: any) => {
      this.bills = response.data;
      if (this.bills.length === 0){
        this.selectedCustomer.isEmptyBills = true;
      }else{
        this.selectedCustomer.isEmptyBills = false;
      }
      this.filtereddBills = response.data;
      this.discountTotal = this.bills.reduce((prev, next) => prev + next.discount, 0);
      this.quantityTotal = this.bills.reduce((prev, next) => prev + next.qty, 0);
      this.lcTotal = this.bills.reduce((prev, next) => prev + next.lc, 0);
    });
    this.reportService.getCustomerBalanceWithDiscount(customer.cust_id, this.reportForm.value.startDateSql, this.reportForm.value.endDateSql, this.reportForm.value.discount).subscribe((response: any) => {
      console.log('checking');
      this.currentCustomerDues = response.data;
      console.log(response.data);
    });
  }

  onSelectedBill(bill) {

  }

  buttonClicked() {
    // tslint:disable-next-line:triple-equals
    if (this.onlyDiscountable){
      this.filtereddBills = this.bills.filter(bill => bill.is_dicountable === 1);
      this.discountTotal = this.filtereddBills.reduce((prev, next) => prev + next.discount, 0);
      this.quantityTotal = this.filtereddBills.reduce((prev, next) => prev + next.qty, 0);
      this.lcTotal = this.filtereddBills.reduce((prev, next) => prev + next.lc, 0);
    }else{
      this.filtereddBills = this.bills;
      this.discountTotal = this.filtereddBills.reduce((prev, next) => prev + next.discount, 0);
      this.quantityTotal = this.filtereddBills.reduce((prev, next) => prev + next.qty, 0);
      this.lcTotal = this.filtereddBills.reduce((prev, next) => prev + next.lc, 0);
    }

  }
}
