import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawByOwnerRoutingModule } from './withdraw-by-owner-routing.module';
import { WithdrawByOwnerComponent } from './withdraw-by-owner.component';
import {MatButtonModule} from '@angular/material/button';
import {TableModule} from 'primeng/table';
import {NgSelectModule} from '@ng-select/ng-select';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    WithdrawByOwnerComponent
  ],
  imports: [
    CommonModule,
    WithdrawByOwnerRoutingModule,
    MatButtonModule,
    TableModule,
    NgSelectModule,
    FlexModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class WithdrawByOwnerModule { }
