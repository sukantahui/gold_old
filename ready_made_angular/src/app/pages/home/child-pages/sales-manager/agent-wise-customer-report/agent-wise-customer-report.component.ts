import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {AgentService} from "../../../../../services/agent.service";

@Component({
  selector: 'app-agent-wise-customer-report',
  templateUrl: './agent-wise-customer-report.component.html',
  styleUrls: ['./agent-wise-customer-report.component.scss']
})
export class AgentWiseCustomerReportComponent implements OnInit {
  isProduction = environment.production;
  agents: any[];
  customers: any[];
  customerReceiptPayment: any[];
  constructor(private agentService: AgentService) { }

  ngOnInit(): void {
    this.agentService.getAgentsWithDues().subscribe((response: {status: any , data: any[]}) => {
      this.agents = response.data;
    });
  }

  agentSelected(agentId: string) {
    this.agentService.getCustomersWithDuesByAgent(agentId).subscribe((response: {status: any , data: any[]}) => {
      this.customers = response.data;
    });
  }

  customerSelected(cust_id: string) {
    this.agentService.getCustomerReceiptPayment(cust_id).subscribe((response: {status: any , data: any[]}) => {
      this.customerReceiptPayment = response.data;
    });
  }
}
