import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
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
  reportForm: UntypedFormGroup;
  constructor(private route: ActivatedRoute, private commonService: CommonService, public datepipe: DatePipe) {
    this.route.data.subscribe((response: any) => {
      this.customers = response.customerResolver.customers.data;
    });
    const stDate = new Date('2022-06-16');
    const endDate = new Date();
    this.reportForm = new UntypedFormGroup({
      customerId: new UntypedFormControl(null),
      startDate: new UntypedFormControl(stDate),
      startDateSQL: new UntypedFormControl(0),
      endDate: new UntypedFormControl(),
      endDateSQL: new UntypedFormControl(null),
      discount: new UntypedFormControl(50)
    });
    this.reportForm.patchValue({startDateSQL: this.datepipe.transform(stDate, 'yyyy-MM-dd')});
    this.reportForm.patchValue({endDateSQL: this.datepipe.transform(endDate, 'yyyy-MM-dd')});
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
