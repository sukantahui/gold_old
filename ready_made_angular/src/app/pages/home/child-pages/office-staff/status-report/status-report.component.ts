import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.scss']
})
export class StatusReportComponent implements OnInit {
  statusReportForm: FormGroup;
  constructor() {
    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.statusReportForm =  new FormGroup({
      start_date: new FormControl(currentSQLDate),
      end_date: new FormControl(currentSQLDate),
    });
  }

  ngOnInit(): void {
  }

  dateInputEvent($event: any) {
    
  }

  dateChangeEvent($event: any) {
    
  }
}
