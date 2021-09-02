import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import {AgentWiseSalesReportService} from '../../../../../services/agent-wise-sales-report.service';

@Component({
  selector: 'app-agent-wise-sale-report',
  templateUrl: './agent-wise-sale-report.component.html',
  styleUrls: ['./agent-wise-sale-report.component.scss']
})
export class AgentWiseSaleReportComponent implements OnInit {
  agentWiseSaleReportForm: FormGroup;
  startDate: string;
  endDate: string;
  agentList: any[];
  constructor(private agentWiseSalesReportService: AgentWiseSalesReportService) {
    const now = new Date();
    const currentSQLDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.startDate = formatDate(now, 'yyyy-MM-dd', 'en');
    this.endDate = formatDate(now, 'yyyy-MM-dd', 'en');

    this.agentWiseSaleReportForm = new FormGroup({
      start_date: new FormControl(currentSQLDate),
      end_date: new FormControl(currentSQLDate),
      agent_id: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.agentWiseSalesReportService.getAgentsUpdateListener().subscribe((response)=>{
      this.agentList = response;
    });
  }
  startDateChangeEvent($event: any) {
    this.startDate = formatDate(new Date($event.value), 'yyyy-MM-dd', 'en');
  }

  endDateChangeEvent($event: any) {
    this.endDate = formatDate(new Date($event.value), 'yyyy-MM-dd', 'en');
  }
  dateInputEvent($event: any) {

  }

  getReport() {

  }
}
