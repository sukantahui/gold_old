import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferToAgentRoutingModule } from './transfer-to-agent-routing.module';
import { TransferToAgentComponent } from './transfer-to-agent.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MaterialModule} from "../../../../../core/material.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    TransferToAgentComponent
  ],
  imports: [
    CommonModule,
    TransferToAgentRoutingModule,
    MaterialModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
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


