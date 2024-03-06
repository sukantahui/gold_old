import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';
import {ReportService} from '../../../../../../services/report.service';
import {CommonService} from '../../../../../../services/common.service';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-fine-returned-to-owner-report',
  templateUrl: './fine-returned-to-owner-report.component.html',
  styleUrls: ['./fine-returned-to-owner-report.component.scss']
})
export class FineReturnedToOwnerReportComponent implements OnInit {
  isProduction: boolean = environment.production;
  reportForm: FormGroup;
  isLoading = false;
  records: any[];

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
  setStartDateSQL(value: string) {
    this.reportForm.patchValue({startDateSql: this.commonService.getSQLDate2(value)});
  }

  setEndDateSQL(value: string) {
    this.reportForm.patchValue({endDateSql: this.commonService.getSQLDate2(value)});
  }
  ngOnInit(): void {
  }

  loadReport(dateFrom: string, dateTo: string) {
    this.reportForm.patchValue({startDateSql: this.commonService.getSQLDate2(dateFrom)});
    this.reportForm.patchValue({endDateSql: this.commonService.getSQLDate2(dateTo)});
    this.isLoading = true;
    this.reportService.getFineWithdrawnByOwner(this.reportForm.value.startDateSql, this.reportForm.value.endDateSql).subscribe((response) => {
      this.records = response.data;

      this.isLoading = false;
    });
  }
}
