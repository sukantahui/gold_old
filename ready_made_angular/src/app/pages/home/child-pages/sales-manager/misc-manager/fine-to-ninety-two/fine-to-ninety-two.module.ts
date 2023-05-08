import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FineToNinetyTwoRoutingModule } from './fine-to-ninety-two-routing.module';
import { FineToNinetyTwoComponent } from './fine-to-ninety-two.component';


@NgModule({
  declarations: [
    FineToNinetyTwoComponent
  ],
  imports: [
    CommonModule,
    FineToNinetyTwoRoutingModule
  ]
})
export class FineToNinetyTwoModule { }
