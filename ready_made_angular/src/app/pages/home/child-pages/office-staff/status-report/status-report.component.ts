import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';
import {OfficeStaffStatusReportService} from '../../../../../services/office-staff-status-report.service';
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
  totalGoldSendToJob: number;
  totalGoldReceivedFromJob: number;
  totalNitricReceivedFromJob: number;
  reportCount = 0;
  billTotal: {ploss: number, lc: number, mv: number, fine_gold: number, guinea_gold: number} = {ploss: 0, lc: 0, mv: 0, fine_gold: 0, guinea_gold: 0};

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

  getReport() {
    this.statusReportService.getMaterialReceivedByDate( this.startDate, this.endDate, 48, 70).subscribe(response => {
      this.totalGoldReceived = response.data;
      this.reportCount++;
      console.log('Total Received Gold', response);
    }, (error) => {
      // when error occured
      console.log(error);
    });

    // Gold send to job
    this.statusReportService.getGoldSendToJobByDateAndEmployee( this.startDate, this.endDate, 48, 70).subscribe(response => {
      this.totalGoldSendToJob = response.data;
      this.reportCount++;
      console.log('Total Gold Send to job', response);
    }, (error) => {
      // when error occured
      console.log(error);
    });

    // Gold Received from job
    this.statusReportService.getGoldReceivedFromJobByDateAndEmployee( this.startDate, this.endDate, 48, 70).subscribe(response => {
      this.totalGoldReceivedFromJob = response.data;
      this.reportCount++;
      console.log('Total Gold Received from job', response);
    }, (error) => {
      // when error occured
      console.log(error);
    });
    // Nitric Received from job
    this.statusReportService.getNitricReceivedFromJobByDateAndEmployee( this.startDate, this.endDate, 45, 70).subscribe(response => {
      this.totalNitricReceivedFromJob = response.data;
      this.reportCount++;
      console.log('Nitric Received from Job', response);
    }, (error) => {
      // when error occured
      console.log(error);
    });

    // Bill Total
    this.statusReportService.getBillTotalByDate( this.startDate, this.endDate).subscribe(response => {
      this.billTotal = response.data;
      this.reportCount++;
      console.log('Bill Total', response);
    }, (error) => {
      // when error occured
      console.log(error);
    });
  }


}
