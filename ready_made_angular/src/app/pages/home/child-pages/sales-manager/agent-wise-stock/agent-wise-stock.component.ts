import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {AgentService} from '../../../../../services/agent.service';

@Component({
  selector: 'app-agent-wise-stock',
  templateUrl: './agent-wise-stock.component.html',
  styleUrls: ['./agent-wise-stock.component.scss']
})
export class AgentWiseStockComponent implements OnInit {

  agentList: any[];
  isProduction = environment.production;
  constructor(private  agentService: AgentService) { }

  ngOnInit(): void {
    this.agentService.getAgentUpdateListener().subscribe((response) => {
      this.agentList = response;
    });
  }
}
