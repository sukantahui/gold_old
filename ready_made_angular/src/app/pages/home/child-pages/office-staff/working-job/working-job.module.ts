import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingJobRoutingModule } from './working-job-routing.module';
import { WorkingJobComponent } from './working-job.component';


@NgModule({
  declarations: [
    WorkingJobComponent
  ],
  imports: [
    CommonModule,
    WorkingJobRoutingModule
  ]
})
export class WorkingJobModule { }
