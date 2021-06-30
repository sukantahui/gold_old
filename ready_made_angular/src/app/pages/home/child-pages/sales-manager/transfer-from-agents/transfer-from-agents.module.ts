import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferFromAgentsRoutingModule } from './transfer-from-agents-routing.module';
import { TransferFromAgentsComponent } from './transfer-from-agents.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    TransferFromAgentsComponent
  ],
  imports: [
    CommonModule,
    TransferFromAgentsRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class TransferFromAgentsModule { }
