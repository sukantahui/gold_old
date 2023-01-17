import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {AgentService} from '../../../../../services/agent.service';
import {CommonService} from '../../../../../services/common.service';

@Component({
  selector: 'app-agent-salary',
  templateUrl: './agent-salary.component.html',
  styleUrls: ['./agent-salary.component.scss']
})
export class AgentSalaryComponent implements OnInit {
  agentSalarySearchForm: UntypedFormGroup;
  isProduction = environment.production;
  year = 2022;
  month = 1;
  isLoading = false;
  agentSalaries: any[];
  grossTotalIncome: number;
  grossTotalQuantity: number;
  months = ['No Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  grossTotalReturnQuantity = 0;
  constructor(private agentService: AgentService) {

    this.agentSalarySearchForm = new UntypedFormGroup({
      year: new UntypedFormControl(2022),
      month: new UntypedFormControl(5),
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
      // tslint:disable-next-line:max-line-length
      this.agentService.getAgentSalaryByYearAndMonth(this.agentSalarySearchForm.get('year').value, this.agentSalarySearchForm.get('month').value).subscribe((response: {status: any , data: any[]}) => {
        this.agentSalaries = response.data;
        this.grossTotalIncome = this.agentSalaries.filter(item => item.total_income > '0').reduce((accumulator, obj) => {
          return accumulator + obj.total_income;
        }, 0);
        this.grossTotalQuantity = this.agentSalaries.filter(item => item.qty > '0').reduce((accumulator, obj) => {
          return accumulator + obj.qty;
        }, 0);

        // gross total return
        this.grossTotalReturnQuantity = this.agentSalaries.filter(item => item.return_qty > '0').reduce((accumulator, obj) => {
          return accumulator + obj.return_qty;
        }, 0);
      });
    }
    saveAgentSalary(){
      // tslint:disable-next-line:max-line-length
      this.agentService.saveAgentSalaryByYearAndMonth(this.agentSalarySearchForm.get('year').value, this.agentSalarySearchForm.get('month').value).subscribe((response: any) => {
          console.log(response);
      });
    }
}
