import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-agent-salary-balance-sheet',
  templateUrl: './agent-salary-balance-sheet.component.html',
  styleUrls: ['./agent-salary-balance-sheet.component.scss']
})
export class AgentSalaryBalanceSheetComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((response: any) => {
      console.log(response);
      // this.agents = response.agentSalaryBalanceSheetResolver.agents.data;
    });
    
  }

  ngOnInit(): void {
  }

}
