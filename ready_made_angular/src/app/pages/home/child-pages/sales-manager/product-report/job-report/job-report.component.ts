import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {ReportService} from '../../../../../../services/report.service';
import {CommonService} from '../../../../../../services/common.service';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-job-report',
  templateUrl: './job-report.component.html',
  styleUrls: ['./job-report.component.scss']
})
export class JobReportComponent implements OnInit {

  isProduction: boolean = environment.production;
  reportForm: UntypedFormGroup;
  isLoading = false;
  jobs: any;
  selectedJob: any;
  showJobDetailDiv = false;

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

  setStartDateSQL(value: string) {
    this.reportForm.patchValue({startDateSql: this.commonService.getSQLDate2(value)});
  }

  setEndDateSQL(value: string) {
    this.reportForm.patchValue({endDateSql: this.commonService.getSQLDate2(value)});
  }

  loadSaleReport(dateFrom: string, dateTo: string) {
    this.reportForm.patchValue({startDateSql: this.commonService.getSQLDate2(dateFrom)});
    this.reportForm.patchValue({endDateSql: this.commonService.getSQLDate2(dateTo)});
    this.isLoading = true;
    this.reportService.getJobsByDates(this.reportForm.value.startDateSql, this.reportForm.value.endDateSql).subscribe((response) => {
      this.jobs = response.data;

      this.isLoading = false;
    });
  }

  onJobSelect(job) {
    console.log(job);
    this.selectedJob = job;
    this.showJobDetailDiv = true;
  }
}
