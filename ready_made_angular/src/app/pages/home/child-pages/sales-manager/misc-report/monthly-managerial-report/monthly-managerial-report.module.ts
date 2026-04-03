import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyManagerialReportRoutingModule } from './monthly-managerial-report-routing.module';
import { MonthlyManagerialReportComponent } from './monthly-managerial-report.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NinetyTwoGoldFormComponent } from './ninety-two-gold-form/ninety-two-gold-form.component';
import {FineGoldFormModule} from './fine-gold-form/fine-gold-form.module';


@NgModule({
  declarations: [
    MonthlyManagerialReportComponent,
    NinetyTwoGoldFormComponent
  ],
    imports: [
        CommonModule,
        MonthlyManagerialReportRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FineGoldFormModule
    ]
})
export class MonthlyManagerialReportModule { }
