import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-agent-wise-sale-report',
  templateUrl: './agent-wise-sale-report.component.html',
  styleUrls: ['./agent-wise-sale-report.component.scss']
})
export class AgentWiseSaleReportComponent implements OnInit {
  agentWiseSaleReportForm: FormGroup;
  startDate: string;
  endDate: string;
  constructor() {
    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.startDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.endDate = formatDate(now, 'yyyy-MM-dd', 'en');

    this.agentWiseSaleReportForm = new FormGroup({
      start_date: new FormControl(currentSQLDate),
      end_date: new FormControl(currentSQLDate),
    });
  }

  ngOnInit(): void {
  }
  startDateChangeEvent($event: any) {
    this.startDate = formatDate(new Date($event.value), 'yyyy-MM-dd', 'en');
  }

  endDateChangeEvent($event: any) {
    this.endDate = formatDate(new Date($event.value), 'yyyy-MM-dd', 'en');
  }
  dateInputEvent($event: any) {

  }

}