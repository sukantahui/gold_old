import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuManagerRoutingModule } from './menu-manager-routing.module';
import { MenuManagerComponent } from './menu-manager.component';
import {MenuItemModule} from '../menu-item/menu-item.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    MenuManagerComponent
  ],
  exports: [
    MenuManagerComponent
  ],
  imports: [
    CommonModule,
    MenuManagerRoutingModule,
    MenuItemModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class MenuManagerModule { }
