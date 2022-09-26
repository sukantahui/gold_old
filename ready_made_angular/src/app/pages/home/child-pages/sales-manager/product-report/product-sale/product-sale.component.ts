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
      endDate: new FormControl(endDate)
    });

  }


  ngOnInit(): void {
  }


  loadSaleReport() {
    this.isLoading = true;
    this.reportService.getModelWiseSaleReport().subscribe((response) =>{
      this.modelWiseSales = response.data;
      this.isLoading = false;
    });
  }
}
