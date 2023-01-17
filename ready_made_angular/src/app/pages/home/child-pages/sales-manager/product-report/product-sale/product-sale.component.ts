import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {CommonService} from '../../../../../../services/common.service';
import {DatePipe} from '@angular/common';
import {DateAdapter} from '@angular/material/core';
import {ReportService} from '../../../../../../services/report.service';
import {Table} from 'primeng/table';
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
  reportForm: UntypedFormGroup;
  isLoading = false;
  modelWiseSales: {model_no: string, sale_qty: number}[];
  isLoadingSale = false;
  sales: any = [];
  selectedModel: any;
  constructor(private reportService: ReportService, private commonService: CommonService, private readonly adapter: DateAdapter<Date>) {
    this.adapter.setLocale('in');
    const stDate = new Date();

    const endDate = new Date();
    this.reportForm = new UntypedFormGroup({
      startDate: new UntypedFormControl(stDate),
      startDateSql: new UntypedFormControl(null),
      endDate: new UntypedFormControl(endDate),
      endDateSql: new UntypedFormControl(null),
      reportLimit: new UntypedFormControl(50)
    });

  }


  ngOnInit(): void {
  }


  loadSaleReport(dateFrom: string, dateTo: string) {
    this.reportForm.patchValue({startDateSql: this.commonService.getSQLDate2(dateFrom)});
    this.reportForm.patchValue({endDateSql: this.commonService.getSQLDate2(dateTo)});
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

  showSaleReportByModel(modelNo: any) {
    // tslint:disable-next-line:max-line-length
    this.selectedModel = modelNo;
    this.reportService.getSaleByModel(this.reportForm.value.startDateSql, this.reportForm.value.endDateSql, modelNo).subscribe((response) => {
      console.log(response.data);
      this.sales = response.data;
    });
  }
}
