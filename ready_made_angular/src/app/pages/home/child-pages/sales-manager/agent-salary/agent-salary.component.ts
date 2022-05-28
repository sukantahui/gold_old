import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';
import {AgentService} from '../../../../../services/agent.service';
import {CommonService} from '../../../../../services/common.service';

@Component({
  selector: 'app-agent-salary',
  templateUrl: './agent-salary.component.html',
  styleUrls: ['./agent-salary.component.scss']
})
export class AgentSalaryComponent implements OnInit {
  agentSalarySearchForm: FormGroup;
  isProduction = environment.production;
  year = 2022;
  month = 1;
  isLoading = false;
  agentSalaries: any[];
  constructor(private agentService: AgentService) {

    this.agentSalarySearchForm = new FormGroup({
      year: new FormControl(2022),
      month: new FormControl(5),
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
      this.agentService.getAgentSalaryByYearAndMonth(this.agentSalarySearchForm.get('year').value, this.agentSalarySearchForm.get('month').value).subscribe((response: {status: any , data: any[]}) => {
        this.agentSalaries = response.data;
      });
    }
}
