import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {DateAdapter} from '@angular/material/core';
import {ReportService} from '../../../../../../services/report.service';
import {CommonService} from '../../../../../../services/common.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-material-to-employees-report',
  templateUrl: './material-to-employees-report.component.html',
  styleUrls: ['./material-to-employees-report.component.scss']
})
export class MaterialToEmployeesReportComponent implements OnInit {
  isProduction: boolean = environment.production;
  reportForm: FormGroup;
  isLoading = false;
  materialList: any[];
  materialTransactions: any[];
  totalInward = 0;;
  constructor(private reportService: ReportService, public commonService: CommonService, private readonly adapter: DateAdapter<Date>) {
    this.adapter.setLocale('in');
    const stDate = new Date();

    const endDate = new Date();
    // var str = new Date().setSeconds(0,0);
    // var dt = new Date(str);
    // console.log(dt.getDate());

    this.reportForm = new FormGroup({
      startDate: new FormControl(stDate),
      startDateSql:  new FormControl(stDate.getFullYear() + '-' + (stDate.getMonth() + 1) + '-' + stDate.getDate()),
      endDate: new FormControl(endDate),
      endDateSql: new FormControl(endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate()),
      reportLimit: new FormControl(50),
      rm_id : new FormControl(null)
    });

  }

  setStartDateSQL(value: string) {
    this.reportForm.patchValue({startDateSql: this.commonService.getSQLDate2(value)});
  }

  setEndDateSQL(value: string) {
    this.reportForm.patchValue({endDateSql: this.commonService.getSQLDate2(value)});
  }

  ngOnInit(): void {
    this.reportService.getOwnerSubmittedMaterials()
        .subscribe((response: {status: any , data: any[]}) => {
          this.materialList = response.data;
        });
  }

  // incomplete

  loadReport() {
    console.log(this.reportForm.value.startDateSql, this.reportForm.value.endDateSql, this.reportForm.value.rm_id);
    this.reportService.getMaterialsSendByOwnerByDatesAndMaterial(this.reportForm.value.startDateSql, this.reportForm.value.endDateSql, this.reportForm.value.rm_id)
        .subscribe((response: {status: boolean, message: any, data: any[]}) => {
      this.materialTransactions = response.data;
      this.totalInward = this.materialTransactions.map(item => item.inward).reduce((prev, next) => prev + next);
    });
  }

  onFilter($event, dt2: any) {
    this.totalInward = dt2.filteredValue.map(item => item.inward).reduce((prev, next) => prev + next);
  }
}
