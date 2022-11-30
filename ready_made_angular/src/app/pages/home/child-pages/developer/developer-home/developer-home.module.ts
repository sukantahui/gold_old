import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloperHomeRoutingModule } from './developer-home-routing.module';
import { DeveloperHomeComponent } from './developer-home.component';


@NgModule({
  declarations: [
    DeveloperHomeComponent
  ],
  imports: [
    CommonModule,
    DeveloperHomeRoutingModule
  ]
})
export class DeveloperHomeModule { }
