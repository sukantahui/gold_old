import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';
import {CommonService} from '../../../../../../services/common.service';
import {DatePipe} from '@angular/common';
import {DateAdapter} from '@angular/material/core';
export enum Month {
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
}
@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.scss']
})
export class ProductSaleComponent implements OnInit {
  isProduction: boolean = environment.production;
  reportForm: FormGroup;
  constructor(private commonService: CommonService, private readonly adapter: DateAdapter<Date>) {
    this.adapter.setLocale('in');
    const stDate = new Date();

    const endDate = new Date();
    this.reportForm = new FormGroup({
      startDate: new FormControl(stDate),
      startDateSQL: new FormControl(0),
      endDate: new FormControl(endDate)
    });
    // this.reportForm.patchValue({startDateSQL: this.datepipe.transform(stDate, 'yyyy-MM-dd')});
    // this.reportForm.patchValue({endDateSQL: this.datepipe.transform(endDate, 'yyyy-MM-dd')});
  }


  ngOnInit(): void {
  }


  setStartDateSQL(value: string) {
    console.log(value);
    const stringified = JSON.stringify(this.reportForm.value.startDate + this.reportForm.value.startDate.getTimezoneOffset());
    const dob = stringified.substring(5, 16);
    this.reportForm.patchValue({startDateSQL: dob});
    // console.log(this.CommonService());
  }
}
