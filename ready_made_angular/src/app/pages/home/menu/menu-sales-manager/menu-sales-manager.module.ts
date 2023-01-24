import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuSalesManagerRoutingModule } from './menu-sales-manager-routing.module';
import { MenuSalesManagerComponent } from './menu-sales-manager.component';
import {MenuItemModule} from '../menu-item/menu-item.module';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';


@NgModule({
    declarations: [
        MenuSalesManagerComponent
    ],
    exports: [
        MenuSalesManagerComponent
    ],
    imports: [
        CommonModule,
        MenuSalesManagerRoutingModule,
        MenuItemModule,
        MatMenuModule,
        MatButtonModule
    ]
})
export class MenuSalesManagerModule { }
