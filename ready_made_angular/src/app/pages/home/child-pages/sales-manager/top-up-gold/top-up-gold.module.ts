import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopUpGoldRoutingModule } from './top-up-gold-routing.module';
import { TopUpGoldComponent } from './top-up-gold.component';
import {MaterialModule} from '../../../../../core/material.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {NgSelectModule} from '@ng-select/ng-select';
import {FlexModule} from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    TopUpGoldComponent
  ],
  imports: [
    CommonModule,
    TopUpGoldRoutingModule,
    MaterialModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    NgSelectModule,
    FlexModule,
    MatCheckboxModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatBadgeModule,
    MatIconModule
  ]
})
export class TopUpGoldModule { }
