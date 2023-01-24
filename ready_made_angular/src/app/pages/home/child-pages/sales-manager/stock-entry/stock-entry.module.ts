import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockEntryRoutingModule } from './stock-entry-routing.module';
import { StockEntryComponent } from './stock-entry.component';
import {MaterialModule} from '../../../../../core/material.module';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {NgSelectModule} from '@ng-select/ng-select';
import {FlexModule} from '@angular/flex-layout';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [
    StockEntryComponent
  ],
  imports: [
    CommonModule,
    StockEntryRoutingModule,
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
    MatIconModule,
    MatSortModule
  ]
})
export class StockEntryModule { }
