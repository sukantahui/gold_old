import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';
import {CommonService} from '../../../../../../services/common.service';
import {DatePipe} from '@angular/common';
import {DateAdapter} from '@angular/material/core';
import {ReportService} from '../../../../../../services/report.service';
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
  isLoading = false;
  modelWiseSales: {model_no: string, sale_qty: number}[];
  constructor(private reportService: ReportService, private commonService: CommonService, private readonly adapter: DateAdapter<Date>) {
    this.adapter.setLocale('in');
    const stDate = new Date();

    const endDate = new Date();
    this.reportForm = new FormGroup({
      startDate: new FormControl(stDate),
      startDateSql: new FormControl(null),
      endDate: new FormControl(endDate),
      endDateSql: new FormControl(null),
      reportLimit: new FormControl(50)
    });

  }


  ngOnInit(): void {
  }


  loadSaleReport() {
    this.isLoading = true;

    this.reportService.getModelWiseSaleReport(this.reportForm.value.startDateSql, this.reportForm.value.endDateSql, this.reportForm.value.reportLimit).subscribe((response) => {
      this.modelWiseSales = response.data;
      this.isLoading = false;
    });
  }

  setStartDateSQL(value: string) {
    this.reportForm.patchValue({startDateSql: this.commonService.getSQLDate2(value)});
  }

  setEndDateSQL(value: string) {
    this.reportForm.patchValue({endDateSql: this.commonService.getSQLDate2(value)});
  }

}
