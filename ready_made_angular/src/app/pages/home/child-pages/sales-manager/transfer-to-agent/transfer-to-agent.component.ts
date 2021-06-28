import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {TransferAgentService} from '../../../../../services/transfer-agent.service';

@Component({
  selector: 'app-transfer-to-agent',
  templateUrl: './transfer-to-agent.component.html',
  styleUrls: ['./transfer-to-agent.component.scss']
})
export class TransferToAgentComponent implements OnInit {
  agentList: any[];
  productList: any[];
  transferForm: FormGroup;
  constructor(public transferAgentService: TransferAgentService) {

    this.transferForm = new FormGroup({
      agent_id: new FormControl(null),
      short_name: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.transferAgentService.getAgentsUpdateListener().subscribe(response => {
      this.agentList = response;
    });
    this.transferAgentService.getProductsUpdateListener().subscribe(response => {
      this.productList = response;
    });
  }
}
