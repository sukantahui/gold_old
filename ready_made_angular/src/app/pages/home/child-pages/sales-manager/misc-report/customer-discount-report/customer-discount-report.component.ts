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
  constructor(private route: ActivatedRoute, private reportService: ReportService,  public commonService: CommonService) {
    this.route.data.subscribe((response: any) => {
      console.log(response.customerResolvers.customers.data);
      this.customers = response.customerResolvers.customers.data;
    });
  }

  ngOnInit(): void {
  }

  onSelectedCustomer(customer) {
    this.reportService.getCustomerDiscountById(customer.cust_id, '2021-10-1', '2022-1-30', 25).subscribe((response: any) => {
      this.bills = response.data;
    });
  }

  onSelectedBill(bill) {
    
  }
}
