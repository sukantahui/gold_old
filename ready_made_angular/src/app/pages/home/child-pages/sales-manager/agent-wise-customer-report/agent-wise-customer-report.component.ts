import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {AgentService} from '../../../../../services/agent.service';
import {CommonService} from '../../../../../services/common.service';
import {CustomerService} from '../../../../../services/customer.service';

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
  selectedAgentIndex = -2;
  selectedAgent: any;
  agentDues: { gold: number; lc: number };
  selectedCustomer: any;
  selectedCustomerIndex = -1;
  showCustomerReceiptPayment = false;

  constructor(private agentService: AgentService, private customerService: CustomerService , public commonService: CommonService) { }

  ngOnInit(): void {
    this.agentService.getAgentsWithDues().subscribe((response: {status: any , data: any[]}) => {
      this.agents = response.data;
      const agentLcTotal = this.agents.reduce((prev, next) => prev + next.lc_due, 0);
      const agentGoldTotal = this.agents.reduce((prev, next) => prev + next.gold_due, 0);
      this.agentDues = {gold: agentGoldTotal, lc: agentLcTotal};
    });
    this.customerService.getCustomersWithBalance().subscribe((response:{status: any , data: any[]}) => {
      this.customers = response.data;
      this.showCustomerReceiptPayment = true;
    });
  }

  agentSelected(agent: any, index: number) {
    this.selectedAgentIndex = index;
    this.selectedAgent = agent;
    this.selectedCustomerIndex = -1;
    this.agentService.getCustomersWithDuesByAgent(agent.agent_id).subscribe((response: {status: any , data: any[]}) => {
           this.customers = response.data;
           this.showCustomerReceiptPayment = true;
           this.customerReceiptPayment = null;
    });
    // this.selectedCustomerIndex = -1;
    // // tslint:disable-next-line:triple-equals
    // if (index == -1){
    //   this.selectedAgentIndex = -1;
    //   this.selectedAgent = null;
    //   this.agentService.getCustomersWithDues().subscribe((response: {status: any , data: any[]}) => {
    //     this.customers = response.data;
    //     this.customerReceiptPayment = null;
    //   });
    // }else{
    //   this.selectedAgentIndex = index;
    //   this.selectedAgent = agent;
    //   this.agentService.getCustomersWithDuesByAgent(agent.agent_id).subscribe((response: {status: any , data: any[]}) => {
    //     this.customers = response.data;
    //     this.customerReceiptPayment = null;
    //   });
    // }
  }

  customerSelected(customer: any, index: number) {
    this.agentService.getCustomerReceiptPayment(customer.cust_id).subscribe((response: {status: any , data: any[]}) => {
      this.customerReceiptPayment = response.data;
      this.selectedCustomer = customer;
      this.selectedCustomerIndex = index;
      this.showCustomerReceiptPayment = true;
    });
  }
}
