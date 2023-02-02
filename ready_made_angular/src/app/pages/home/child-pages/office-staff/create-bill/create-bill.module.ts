import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBillRoutingModule } from './create-bill-routing.module';
import { CreateBillComponent } from './create-bill.component';
import {MatCardModule} from "@angular/material/card";
import {NgSelectModule} from "@ng-select/ng-select";
import {FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxPrinterModule} from "ngx-printer";
import {NgxPrintModule} from "ngx-print";
import {LoadingSpinnerModule} from '../../../../../shared/loading-spinner/loading-spinner.module';
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    CreateBillComponent
  ],
    imports: [
        CommonModule,
        CreateBillRoutingModule,
        MatCardModule,
        NgSelectModule,
        FlexModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        FontAwesomeModule,
        NgxPrinterModule,
        NgxPrintModule,
        LoadingSpinnerModule,
        MatCheckboxModule
    ]
})
export class CreateBillModule { }
