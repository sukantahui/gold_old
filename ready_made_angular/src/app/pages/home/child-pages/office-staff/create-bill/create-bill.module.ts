import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBillRoutingModule } from './create-bill-routing.module';
import { CreateBillComponent } from './create-bill.component';
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {NgSelectModule} from "@ng-select/ng-select";
import {FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxPrinterModule} from "ngx-printer";
import {NgxPrintModule} from "ngx-print";
import {LoadingSpinnerModule} from '../../../../../shared/loading-spinner/loading-spinner.module';
import {MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";


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
