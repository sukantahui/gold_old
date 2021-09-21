import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {AgentService} from '../../../../../services/agent.service';
import {StockService} from '../../../../../services/stock.service';
import {FormControl, FormGroup} from '@angular/forms';

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
  constructor(private  agentService: AgentService , private stockService: StockService) {
    this.agentStockForm = new FormGroup({
      agent_id : new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.agentService.getAgentUpdateListener().subscribe((response) => {
      this.agentList = response;
    });
  }
  stockByAgent(){
    this.stockService.getStockByAgent(this.agentStockForm.value.agent_id)
        .subscribe((response: {status: any , data: any[]}) => {
            this.stoockListByAgent = response.data;
        });
  }
}
