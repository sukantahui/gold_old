import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AgentService} from '../../../../../services/agent.service';
import {DownloadService} from '../../../../../services/download.service';

@Component({
  selector: 'app-salary-holder-salary-payment',
  templateUrl: './salary-holder-salary-payment.component.html',
  styleUrls: ['./salary-holder-salary-payment.component.scss']
})
export class SalaryHolderSalaryPaymentComponent implements OnInit {
  isProduction = environment.production;
  salaryHolderSalaryPaymentForm: FormGroup;
  salaryHolders: any[];
  constructor(private route: ActivatedRoute, private agentService: AgentService, private downloads: DownloadService) {
    this.route.data.subscribe((response: any) => {
      this.salaryHolders = response.salaryHolderSalaryPaymentResolver.salaryHolders.data;
    });

    this.salaryHolderSalaryPaymentForm = new FormGroup({
      yearNumber: new FormControl(2022),
      monthNumber: new FormControl(5),
      salaryHolderId: new FormControl(null),
      amount: new FormControl(100),
    });
  }

  ngOnInit(): void {
  }

  onSalaryHolderSelect($event: any) {

  }
}
