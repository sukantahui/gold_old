import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {ReportService} from '../../../../../../services/report.service';
import {CommonService} from '../../../../../../services/common.service';
import {DateAdapter} from '@angular/material/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-due-report',
  templateUrl: './due-report.component.html',
  styleUrls: ['./due-report.component.scss']
})
export class DueReportComponent implements OnInit {
  isProduction: boolean = environment.production;
  isLoading = false;
  agentDues: any;
  agentTotalLcDue: number;
  agentTotalGoldDue: number;
  selectedAgent: any;
  customerDues: any;
  constructor(private route: ActivatedRoute, private reportService: ReportService) {
    this.route.data.subscribe((response: any) => {
      console.log(response.dueReportResolver.agentDues.data);
      this.agentDues = response.dueReportResolver.agentDues.data;
      this.agentTotalLcDue = this.agentDues.reduce((prev, next) => prev + next.lc_due, 0);
      this.agentTotalGoldDue = this.agentDues.reduce((prev, next) => prev + next.gold_due, 0);
    });
  }

  ngOnInit(): void {
  }

  onSelectAgent(agentDue: any) {
    this.selectedAgent = agentDue;
    this.reportService.getCustomerDuesByAgent(agentDue.agent_id).subscribe(response => {
      this.customerDues = response.data;
    });
  }

  onFilter($event: any) {
    //https://www.codeusingjava.com/angular/primeng/prime8
    this.selectedAgent = null;
    this.customerDues = undefined;
    this.agentTotalLcDue = $event.filteredValue.reduce((prev, next) => prev + next.lc_due, 0);
    this.agentTotalGoldDue = $event.filteredValue.reduce((prev, next) => prev + next.gold_due, 0);
  }
}
