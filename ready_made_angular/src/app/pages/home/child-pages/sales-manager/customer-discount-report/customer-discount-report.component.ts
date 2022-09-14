import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-customer-discount-report',
  templateUrl: './customer-discount-report.component.html',
  styleUrls: ['./customer-discount-report.component.scss'],
  providers: [DatePipe]
})
export class CustomerDiscountReportComponent implements OnInit {
  isProduction = environment.production;
  customers: any[] = [];
  reportForm: FormGroup;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.customers = response.customerResolver.customers.data;
    });
    this.reportForm = new FormGroup({
      customerId: new FormControl(null),
      startDate: new FormControl(0),
      endDate: new FormControl(0),
      discount: new FormControl(0)
    });
  }

  ngOnInit(): void {
  }

}
