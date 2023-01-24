import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferFromAgentsRoutingModule } from './transfer-from-agents-routing.module';
import { TransferFromAgentsComponent } from './transfer-from-agents.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {TransferToAgentRoutingModule} from '../transfer-to-agent/transfer-to-agent-routing.module';
import {MaterialModule} from '../../../../../core/material.module';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {FlexModule} from '@angular/flex-layout';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {PopoverModule} from 'ngx-smart-popover';


@NgModule({
  declarations: [
    TransferFromAgentsComponent
  ],
    imports: [
        CommonModule,
        TransferFromAgentsRoutingModule,
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
        MatSortModule,
        MatIconModule,
        PopoverModule

    ]
})
export class TransferFromAgentsModule { }
