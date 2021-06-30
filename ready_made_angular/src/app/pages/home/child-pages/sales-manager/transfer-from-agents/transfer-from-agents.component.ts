import { Component, OnInit } from '@angular/core';
import {TransferAgentService} from '../../../../../services/transfer-agent.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-transfer-from-agents',
  templateUrl: './transfer-from-agents.component.html',
  styleUrls: ['./transfer-from-agents.component.scss']
})
export class TransferFromAgentsComponent implements OnInit {

  agents: any[] = [];
  transferForm: FormGroup;
  constructor(private transferAgentService: TransferAgentService) { }

  ngOnInit(): void {
    this.transferForm = new FormGroup({
      agent_id: new FormControl(null),
      short_name: new FormControl(null)
    });
    this.transferAgentService.getAgentsUpdateListener().subscribe((response) => {
      this.agents = response;
      console.log(this.agents);
    });
  }

}
