import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {AgentService} from '../../../../../services/agent.service';
import {StockService} from '../../../../../services/stock.service';
import {FormControl, FormGroup} from '@angular/forms';


import {CommonService} from '../../../../../services/common.service';


@Component({
  selector: 'app-agent-wise-stock',
  templateUrl: './agent-wise-stock.component.html',
  styleUrls: ['./agent-wise-stock.component.scss']
})
export class AgentWiseStockComponent implements OnInit {
  agentStockForm: FormGroup;
  agentList: any[];
  stoockListByAgent: any[];
  isProduction = environment.production;
  /*name of the excel-file which will be downloaded. */
  fileName= 'ExcelSheet.xlsx';

  printDivStyle = {
    table: {'border-collapse': 'collapse', 'width' : '100%' },
    label:{'width': '100%'},
    th: {border: '1px  solid black' , 'fontSize' : 'small'},
    td: {border: '1px  solid black' , 'fontSize' : 'small'},

  };


  constructor(private  agentService: AgentService , private stockService: StockService, public commonService: CommonService) {
    this.agentList = this.agentService.getAgents();
    this.agentStockForm = new FormGroup({
      agent_id : new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.agentList = this.agentService.getAgents();
    this.agentService.getAgentUpdateListener().subscribe((response) => {
      this.agentList = response;
    });
  }
  stockByAgent($event: any){
    this.stockService.getStockByAgent(this.agentStockForm.value.agent_id)
        .subscribe((response: {status: any , data: any[]}) => {
            this.stoockListByAgent = response.data;
        });
  }
}
