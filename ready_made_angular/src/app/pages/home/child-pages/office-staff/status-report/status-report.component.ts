import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';
import {OfficeStaffStatusReportService} from "../../../../../services/office-staff-status-report.service";

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.scss']
})
export class StatusReportComponent implements OnInit {
  statusReportForm: FormGroup;
  startDate: string;
  endDate: string;
  constructor(private statusReportService: OfficeStaffStatusReportService) {

    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.startDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.endDate = formatDate(now, 'yyyy-MM-dd', 'en');

    this.statusReportForm =  new FormGroup({
      start_date: new FormControl(currentSQLDate),
      end_date: new FormControl(currentSQLDate),
    });
  }

  ngOnInit(): void {
  }

  dateInputEvent($event: any) {

  }

  startDateChangeEvent($event: any) {
    this.startDate = formatDate(new Date($event.value), 'yyyy-MM-dd', 'en');
  }

  endDateChangeEvent($event: any) {
    this.endDate = formatDate(new Date($event.value), 'yyyy-MM-dd', 'en');
  }

  getGoldReceived() {
    console.log('goldReceived');
  }
}
