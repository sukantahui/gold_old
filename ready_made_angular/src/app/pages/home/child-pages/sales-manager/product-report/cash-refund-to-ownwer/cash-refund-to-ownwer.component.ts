import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';
import {ReportService} from '../../../../../../services/report.service';
import {CommonService} from '../../../../../../services/common.service';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-cash-refund-to-ownwer',
  templateUrl: './cash-refund-to-ownwer.component.html',
  styleUrls: ['./cash-refund-to-ownwer.component.scss']
})
export class CashRefundToOwnwerComponent implements OnInit {
  isProduction: boolean = environment.production;
  reportForm: FormGroup;
  isLoading = false;
  records: any[];
  totalLc: any;
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

  loadReport(dateFrom: string, dateTo: string) {
    this.reportForm.patchValue({startDateSql: this.commonService.getSQLDate2(dateFrom)});
    this.reportForm.patchValue({endDateSql: this.commonService.getSQLDate2(dateTo)});
    this.isLoading = true;
    this.reportService.getCashWithdrawnByOwner(this.reportForm.value.startDateSql, this.reportForm.value.endDateSql).subscribe((response) => {
      this.records = response.data;
      this.totalLc = this.records.map(item => item.cash).reduce((prev, next) => prev + next);
      this.isLoading = false;
    });
  }
  ngOnInit(): void {
  }
  onFilter($event, dt2: any) {
    this.totalLc = dt2.filteredValue.map(item => item.cash).reduce((prev, next) => prev + next);
  }
}
