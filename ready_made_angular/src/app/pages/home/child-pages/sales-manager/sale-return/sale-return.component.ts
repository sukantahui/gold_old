import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {CustomerService} from '../../../../../services/customer.service';

@Component({
  selector: 'app-sale-return',
  templateUrl: './sale-return.component.html',
  styleUrls: ['./sale-return.component.scss']
})
export class SaleReturnComponent implements OnInit {
  isProduction = environment.production;
  agents: any[];
  customers: any[] = [];
  saleReturnForm: FormGroup;
  isLoading = false;
  monthNumber: number;
  yearNumber: number;
  constructor(private route: ActivatedRoute, private customerService: CustomerService) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.saleReturnResolver.agents.data;
    });
    const salaryMonth = new Date().getMonth();
    const salaryYear = new Date().getFullYear();
    this.yearNumber = salaryYear;
    this.monthNumber = salaryMonth;
    this.saleReturnForm = new FormGroup({
      yearNumber: new FormControl(this.yearNumber),
      monthNumber: new FormControl(this.monthNumber),
      agentId: new FormControl(null),
      customerId: new FormControl(null),
      tag: new FormControl(null),
      modelNo: new FormControl(null),
      modelSize: new FormControl(null),
      gigniGold: new FormControl(null),
      fineGold: new FormControl(null),
      grossWeight: new FormControl(null),
      qty: new FormControl(null),
      lc: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

  onAgentSelect($agent) {
    console.log($agent);
    this.customerService.fetchCustomersByAgentId($agent.agent_id).subscribe(response => {
      this.customers = response.data;
    });
  }

  onCustomerSelect($customer: any) {

  }
}
