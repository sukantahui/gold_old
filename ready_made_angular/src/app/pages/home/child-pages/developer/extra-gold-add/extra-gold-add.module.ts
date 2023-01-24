import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraGoldAddRoutingModule } from './extra-gold-add-routing.module';
import { ExtraGoldAddComponent } from './extra-gold-add.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {NgSelectModule} from '@ng-select/ng-select';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    ExtraGoldAddComponent
  ],
  imports: [
    CommonModule,
    ExtraGoldAddRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    NgSelectModule,
    TableModule
  ]
})
export class ExtraGoldAddModule { }
