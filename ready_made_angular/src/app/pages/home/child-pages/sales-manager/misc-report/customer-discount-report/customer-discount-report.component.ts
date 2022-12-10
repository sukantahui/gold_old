import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {ReportService} from '../../../../../../services/report.service';
import {CommonService} from '../../../../../../services/common.service';

@Component({
  selector: 'app-customer-discount-report',
  templateUrl: './customer-discount-report.component.html',
  styleUrls: ['./customer-discount-report.component.scss']
})
export class CustomerDiscountReportComponent implements OnInit {
  isProduction: boolean = environment.production;
  customers: any[] = [];
  bills: any[];
  onlyDiscountable = false;
  filtereddBills: any[] = [];
  discountTotal = 0;
  selectedCustomer: any;

  constructor(private route: ActivatedRoute, private reportService: ReportService,  public commonService: CommonService) {
    this.route.data.subscribe((response: any) => {
      console.log(response.customerResolvers.customers.data);
      this.customers = response.customerResolvers.customers.data;
    });
  }

  ngOnInit(): void {
  }

  onSelectedCustomer(customer) {
    this.selectedCustomer = customer;
    this.reportService.getCustomerDiscountById(customer.cust_id, '2021-10-1', '2022-1-30', 25).subscribe((response: any) => {
      this.bills = response.data;
      this.filtereddBills = response.data;
      this.discountTotal = this.bills.reduce((prev, next) => prev + next.discount, 0);
    });
  }

  onSelectedBill(bill) {

  }

  buttonClicked() {
    // tslint:disable-next-line:triple-equals
    if (this.onlyDiscountable){
      this.filtereddBills = this.bills.filter(bill => bill.is_dicountable === 1);
    }else{
      this.filtereddBills = this.bills;
    }

  }
}
