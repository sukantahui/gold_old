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
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      console.log(response.dueReportResolver.agentDues.data);
      this.agentDues = response.dueReportResolver.agentDues.data;
    });
  }

  ngOnInit(): void {
  }
}
