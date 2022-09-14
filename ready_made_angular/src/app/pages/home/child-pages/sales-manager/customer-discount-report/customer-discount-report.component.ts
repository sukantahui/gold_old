import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customer-discount-report',
  templateUrl: './customer-discount-report.component.html',
  styleUrls: ['./customer-discount-report.component.scss']
})
export class CustomerDiscountReportComponent implements OnInit {
  isProduction = environment.production;
  customers: any[] = [];
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.customers = response.customerResolver.customers.data;
      // this.agents = response.agentSalaryBalanceSheetResolver.agents.data;
    });
  }

  ngOnInit(): void {
  }

}
