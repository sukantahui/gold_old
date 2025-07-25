import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintJobForWonerRoutingModule } from './print-job-for-woner-routing.module';
import { PrintJobForWonerComponent } from './print-job-for-woner.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    PrintJobForWonerComponent
  ],
  imports: [
    CommonModule,
    PrintJobForWonerRoutingModule,
    ReactiveFormsModule
  ]
})
export class PrintJobForWonerModule { }
