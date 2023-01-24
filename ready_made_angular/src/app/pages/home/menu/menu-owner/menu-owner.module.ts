import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuOwnerRoutingModule } from './menu-owner-routing.module';
import { MenuOwnerComponent } from './menu-owner.component';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MenuItemModule} from '../menu-item/menu-item.module';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';


@NgModule({
    declarations: [
        MenuOwnerComponent
    ],
    exports: [
        MenuOwnerComponent
    ],
    imports: [
        CommonModule,
        MenuOwnerRoutingModule,
        MatMenuModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MenuItemModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class MenuOwnerModule { }
