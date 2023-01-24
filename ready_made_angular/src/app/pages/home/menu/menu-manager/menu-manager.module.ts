import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuManagerRoutingModule } from './menu-manager-routing.module';
import { MenuManagerComponent } from './menu-manager.component';
import {MenuItemModule} from '../menu-item/menu-item.module';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';


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
