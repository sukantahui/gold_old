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
  showAgentDues = true;
  agentTotalGoldDue: number;
  selectedAgent: any;
  customerDues: any;
  selectedCustomer: any = undefined;
  customerTransactions: any = undefined;
  constructor(private route: ActivatedRoute, private reportService: ReportService,  public commonService: CommonService) {
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
    // https://www.codeusingjava.com/angular/primeng/prime8
    this.selectedAgent = null;
    this.customerDues = undefined;
    this.agentTotalLcDue = $event.filteredValue.reduce((prev, next) => prev + next.lc_due, 0);
    this.agentTotalGoldDue = $event.filteredValue.reduce((prev, next) => prev + next.gold_due, 0);
  }

  onCustomerDueCloseButtonClicked() {
    this.selectedAgent = undefined;
    this.customerDues = undefined;
  }

  onSelectCustomer(customer: any) {
    this.selectedCustomer = customer;
    this.reportService.getCustomerTransactionById(customer.cust_id).subscribe(response => {
      this.customerTransactions = response.data;
      this.showAgentDues = false;
    });
  }

  onCustomerTransactionCloseButtonClicked() {
    this.customerTransactions = undefined;
    this.showAgentDues = true;
  }

  onCustomerDueRowSelect($event: any) {
    console.log($event);
  }

  onReferenceSelect(transaction) {

      if (transaction.transaction_code === 1){
        // show Bill
      }
      if (transaction.transaction_code === 2){
        // show Gold Receipt
      }
      if (transaction.transaction_code === 3){
        // show Gold Receipt
      }
  }
}
