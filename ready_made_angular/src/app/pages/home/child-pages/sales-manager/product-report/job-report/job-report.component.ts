import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';
import {ReportService} from '../../../../../../services/report.service';
import {CommonService} from '../../../../../../services/common.service';
import {DateAdapter} from '@angular/material/core';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-job-report',
  templateUrl: './job-report.component.html',
  styleUrls: ['./job-report.component.scss']
})
export class JobReportComponent implements OnInit {

  isProduction: boolean = environment.production;
  reportForm: FormGroup;
  isLoading = false;
  jobs: any;
  selectedJob: any;
  showJobDetailDiv = false;
  goldSend = 0;
  pieces = 0;
  goldReturned = 0;
  panSend = 0;
  nitrickReturned = 0;
  markupValue = 0;
  pLoss = 0;
  totalPLoss = 0;
  totalMarkupValue = 0;
  totalGiniGold = 0;
  totalFineGold = 0;
  totalLC = 0;
  totalDal = 0;

  constructor(private reportService: ReportService, private commonService: CommonService, private readonly adapter: DateAdapter<Date>) {
    this.adapter.setLocale('in');
    const stDate = new Date();

    const endDate = new Date() ;
    endDate.setDate(endDate.getDate() + 1);
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
      this.goldSend = this.jobs.reduce((acc, obj) => acc + obj.goldSend, 0);
      this.pieces = this.jobs.reduce((acc, obj) => acc + obj.pieces, 0);
      this.goldReturned = this.jobs.reduce((acc, obj) => acc + obj.goldReturned, 0);
      this.panSend = this.jobs.reduce((acc, obj) => acc + obj.panSend, 0);
      this.pLoss = this.jobs.reduce((acc, obj) => acc + obj.pLoss, 0);
      this.totalPLoss = this.jobs.reduce((acc, obj) => acc + obj.pLoss * obj.pieces, 0);
      this.nitrickReturned = this.jobs.reduce((acc, obj) => acc + obj.nitrickReturned, 0);
      this.markupValue = this.jobs.reduce((acc, obj) => acc + obj.markupValue, 0);
      this.totalMarkupValue = this.jobs.reduce((acc, obj) => acc + obj.markupValue * obj.pieces, 0);
      this.totalGiniGold = this.jobs.reduce((acc, obj) => acc + obj.gini_gold, 0);
      this.totalFineGold = this.jobs.reduce((acc, obj) => acc + obj.fine_gold, 0);
      this.totalLC = this.jobs.reduce((acc, obj) => acc + (obj.price * obj.pieces), 0);

      this.totalDal = this.jobs.reduce((acc, obj) => acc + (obj.dalSend - obj.dalReturned), 0);

      this.isLoading = false;
    });
  }

  onJobSelect(job) {
    console.log(job);
    this.selectedJob = job;
    this.showJobDetailDiv = true;
  }


  onFilter($event, dt2: any) {
    // this.totalGoldSend = dt2.filteredValue.map(item => item.goldSend).reduce((prev, next) => prev + next);
    if (dt2.filteredValue) {
      this.goldSend = dt2.filteredValue.reduce((acc, obj) => acc + obj.goldSend, 0);
      this.pieces = dt2.filteredValue.reduce((acc, obj) => acc + obj.pieces, 0);
      this.goldReturned = dt2.filteredValue.reduce((acc, obj) => acc + obj.goldReturned, 0);
      this.panSend = dt2.filteredValue.reduce((acc, obj) => acc + obj.panSend, 0);
      this.pLoss = dt2.filteredValue.reduce((acc, obj) => acc + obj.pLoss, 0);
      this.totalPLoss = dt2.filteredValue.reduce((acc, obj) => acc + obj.pLoss * obj.pieces, 0);

      this.nitrickReturned = dt2.filteredValue.reduce((acc, obj) => acc + obj.nitrickReturned, 0);
      this.markupValue = dt2.filteredValue.reduce((acc, obj) => acc + obj.markupValue, 0);
      this.totalMarkupValue = dt2.filteredValue.reduce((acc, obj) => acc + obj.markupValue * obj.pieces, 0);
      this.totalGiniGold = dt2.filteredValue.reduce((acc, obj) => acc + obj.gini_gold, 0);
      this.totalFineGold = dt2.filteredValue.reduce((acc, obj) => acc + obj.fine_gold, 0);
      this.totalLC = dt2.filteredValue.reduce((acc, obj) => acc + obj.price * obj.pices, 0);

      this.totalDal = this.jobs.reduce((acc, obj) => acc + (obj.dalSend - obj.dalReturned), 0);
    }
  }
}
