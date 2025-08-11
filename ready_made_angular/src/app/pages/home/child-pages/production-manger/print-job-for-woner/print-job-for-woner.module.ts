import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintJobForWonerRoutingModule } from './print-job-for-woner-routing.module';
import { PrintJobForWonerComponent } from './print-job-for-woner.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxPrinterModule} from 'ngx-printer';
import {NgxPrintModule} from 'ngx-print';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    PrintJobForWonerComponent
  ],
  imports: [
    CommonModule,
    PrintJobForWonerRoutingModule,
    ReactiveFormsModule,
    NgxPrinterModule,
    NgxPrintModule,
    MatIconModule
  ]
})
export class PrintJobForWonerModule { }
