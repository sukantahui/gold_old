import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialTransformationReportRoutingModule } from './material-transformation-report-routing.module';
import { MaterialTransformationReportComponent } from './material-transformation-report.component';
import {DalCreationModule} from '../dal-creation/dal-creation.module';


@NgModule({
  declarations: [
    MaterialTransformationReportComponent
  ],
    imports: [
        CommonModule,
        MaterialTransformationReportRoutingModule,
        DalCreationModule
    ]
})
export class MaterialTransformationReportModule { }
