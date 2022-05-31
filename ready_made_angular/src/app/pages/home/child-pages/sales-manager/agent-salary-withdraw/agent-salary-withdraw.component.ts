import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-agent-salary-withdraw',
  templateUrl: './agent-salary-withdraw.component.html',
  styleUrls: ['./agent-salary-withdraw.component.scss']
})
export class AgentSalaryWithdrawComponent implements OnInit {
    agentSalarySearchForm: FormGroup;
    isProduction = environment.production;
    agents: any[];
    year = 2022;
    month = 1;
    isLoading = false;
  months = ['No Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      this.agents = response.agentSalaryWithdrawResolver.agents.data;
    });
    this.agentSalarySearchForm = new FormGroup({
      year: new FormControl(2022),
      month: new FormControl(5),
      agent_id: new FormControl(null),
      amount: new FormControl(100),
    });
  }
  printDivStyle = {
    table: {'border-collapse': 'collapse', width : '100%' },
    label: {width: '100%'},
    th: {border: '1px  solid black' , fontSize : 'small'},
    td: {border: '1px  solid black' , fontSize : 'small'},

  };

  ngOnInit(): void {
  }

  getReport() {

  }

    onAgentSelect($event: any) {
        console.log($event);
    }
}
