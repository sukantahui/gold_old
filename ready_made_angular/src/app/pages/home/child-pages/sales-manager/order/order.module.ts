import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatBadgeModule} from "@angular/material/badge";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxPrinterModule} from 'ngx-printer';
import {NgxPrintModule} from 'ngx-print';




@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    NgSelectModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
    NgxPrinterModule,
    NgxPrintModule,
  ]
})
export class OrderModule { }
