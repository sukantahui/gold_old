import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialToManagerRoutingModule } from './material-to-manager-routing.module';
import { MaterialToManagerComponent } from './material-to-manager.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    MaterialToManagerComponent
  ],
  imports: [
    CommonModule,
    MaterialToManagerRoutingModule,
    MatTabsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MaterialToManagerModule { }
