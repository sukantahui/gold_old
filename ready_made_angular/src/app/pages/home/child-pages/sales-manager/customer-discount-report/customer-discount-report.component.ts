import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {CommonService} from '../../../../../services/common.service';

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
  constructor(private route: ActivatedRoute, private commonService: CommonService) {
    this.route.data.subscribe((response: any) => {
      this.customers = response.customerResolver.customers.data;
    });
    this.reportForm = new FormGroup({
      customerId: new FormControl(null),
      startDate: new FormControl(0),
      startDateSQL: new FormControl(0),
      endDate: new FormControl(0),
      endDateSQL: new FormControl(0),
      discount: new FormControl(0)
    });
  }

  ngOnInit(): void {
  }

  setStartDateSQL(value: string) {
    this.reportForm.patchValue({startDateSQL: this.commonService.getSQLDate(value)});
  }

  setEndDateSQL(value: string) {
    this.reportForm.patchValue({endDateSQL: this.commonService.getSQLDate(value)});
  }
}
