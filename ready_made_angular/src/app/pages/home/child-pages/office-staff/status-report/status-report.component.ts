import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';
import {OfficeStaffStatusReportService} from "../../../../../services/office-staff-status-report.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.scss']
})
export class StatusReportComponent implements OnInit {
  statusReportForm: FormGroup;
  startDate: string;
  endDate: string;
  totalGoldReceived: number;
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
    this.statusReportService.getMaterialReceivedByDate( this.startDate,this.endDate).subscribe(response=>{
      this.totalGoldReceived = response.data;
      console.log(response)
    }, (error) => {
      // when error occured
      console.log(error);
    });
  }
}
