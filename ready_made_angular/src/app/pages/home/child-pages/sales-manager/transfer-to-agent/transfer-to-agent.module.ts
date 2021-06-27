import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferToAgentRoutingModule } from './transfer-to-agent-routing.module';
import { TransferToAgentComponent } from './transfer-to-agent.component';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import { FormGroup } from '@angular/forms';


@NgModule({
  declarations: [
    TransferToAgentComponent
  ],
  imports: [
    CommonModule,
    TransferToAgentRoutingModule,
    MaterialModule
  ]
})
export class TransferToAgentModule {
  transferForm: FormGroup;
  constructor(){
    this.transferForm = new FormGroup({
    agent_id: new FormControl(null),
    agent_name: new FormControl(null)
  });
}
 }


