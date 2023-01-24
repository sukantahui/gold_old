import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuPettyCashRoutingModule } from './menu-petty-cash-routing.module';
import { MenuPettyCashComponent } from './menu-petty-cash.component';
import {MenuItemModule} from '../menu-item/menu-item.module';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';


@NgModule({
  declarations: [
    MenuPettyCashComponent
  ],
  exports: [
    MenuPettyCashComponent
  ],
  imports: [
    CommonModule,
    MenuPettyCashRoutingModule,
    MenuItemModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class MenuPettyCashModule { }
