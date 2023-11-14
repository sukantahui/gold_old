import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NitricToFineRoutingModule } from './nitric-to-fine-routing.module';
import { NitricToFineComponent } from './nitric-to-fine.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    NitricToFineComponent
  ],
  imports: [
    CommonModule,
    NitricToFineRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonToggleModule,
    MatTabsModule,
    NgSelectModule,
    MatButtonModule
  ]
})
export class NitricToFineModule { }
