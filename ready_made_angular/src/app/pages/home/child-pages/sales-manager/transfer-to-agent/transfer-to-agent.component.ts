import { Component, OnInit } from '@angular/core';
import {TransferAgentService} from '../../../../../services/transfer-agent.service';

@Component({
  selector: 'app-transfer-to-agent',
  templateUrl: './transfer-to-agent.component.html',
  styleUrls: ['./transfer-to-agent.component.scss']
})
export class TransferToAgentComponent implements OnInit {
  agentList: any[];
  productList: any[];
  constructor(public transferAgentService: TransferAgentService) { }

  ngOnInit(): void {
    this.transferAgentService.getAgentsUpdateListener().subscribe(response => {
      this.agentList = response;
    });
    this.transferAgentService.getProductsUpdateListener().subscribe(response => {
      this.productList = response;
    });
  }

}
