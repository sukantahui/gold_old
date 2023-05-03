import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoldReceivedRoutingModule } from './gold-received-routing.module';
import { GoldReceivedComponent } from './gold-received.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {NgxPrintModule} from 'ngx-print';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    GoldReceivedComponent
  ],
    imports: [
        CommonModule,
        GoldReceivedRoutingModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatFormFieldModule,
        MatRadioModule,
        MatIconModule,
        NgxPrintModule,
        MatButtonModule,
        MatInputModule,

    ]
})
export class GoldReceivedModule { }
