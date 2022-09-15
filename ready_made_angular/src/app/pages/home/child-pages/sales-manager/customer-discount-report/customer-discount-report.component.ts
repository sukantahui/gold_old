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
  constructor(private route: ActivatedRoute, private commonService: CommonService, public datepipe: DatePipe) {
    this.route.data.subscribe((response: any) => {
      this.customers = response.customerResolver.customers.data;
    });
    const stDate = new Date();
    const endDate = new Date();
    this.reportForm = new FormGroup({
      customerId: new FormControl(null),
      startDate: new FormControl(stDate),
      startDateSQL: new FormControl(0),
      endDate: new FormControl(endDate),
      endDateSQL: new FormControl(0),
      discount: new FormControl(50)
    });
    this.reportForm.patchValue({stDate: this.datepipe.transform(stDate, 'dd-MM-yyyy')});
    this.reportForm.patchValue({endDate: this.datepipe.transform(endDate, 'dd-MM-yyyy')});
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
