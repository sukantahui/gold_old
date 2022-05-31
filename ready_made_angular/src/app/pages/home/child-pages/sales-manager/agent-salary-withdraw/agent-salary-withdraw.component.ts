import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-agent-salary-withdraw',
  templateUrl: './agent-salary-withdraw.component.html',
  styleUrls: ['./agent-salary-withdraw.component.scss']
})
export class AgentSalaryWithdrawComponent implements OnInit {
    isProduction = environment.production;
    agents: any[];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.agentSalaryWithdrawResolver.agents.data;
    });
  }

  ngOnInit(): void {
  }

}
