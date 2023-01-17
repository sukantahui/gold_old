import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
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
  saleReturnForm: UntypedFormGroup;
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
    this.saleReturnForm = new UntypedFormGroup({
      yearNumber: new UntypedFormControl(this.yearNumber),
      monthNumber: new UntypedFormControl(this.monthNumber),
      agentId: new UntypedFormControl(null),
      customerId: new UntypedFormControl(null),
      tag: new UntypedFormControl(null),
      modelNo: new UntypedFormControl(null),
      modelSize: new UntypedFormControl(null),
      gigniGold: new UntypedFormControl(null),
      fineGold: new UntypedFormControl(null),
      grossWeight: new UntypedFormControl(null),
      qty: new UntypedFormControl(null),
      lc: new UntypedFormControl(null)
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
