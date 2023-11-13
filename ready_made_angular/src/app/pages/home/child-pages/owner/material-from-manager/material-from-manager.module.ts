import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialFromManagerRoutingModule } from './material-from-manager-routing.module';
import { MaterialFromManagerComponent } from './material-from-manager.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    MaterialFromManagerComponent
  ],
  imports: [
    CommonModule,
    MaterialFromManagerRoutingModule,
    MatTabsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MaterialFromManagerModule { }
