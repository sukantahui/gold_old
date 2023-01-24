import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuDeveloperRoutingModule } from './menu-developer-routing.module';
import { MenuDeveloperComponent } from './menu-developer.component';
import {MenuItemModule} from '../menu-item/menu-item.module';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';


@NgModule({
    declarations: [
        MenuDeveloperComponent
    ],
    exports: [
        MenuDeveloperComponent
    ],
    imports: [
        CommonModule,
        MenuDeveloperRoutingModule,
        MenuItemModule,
        MatMenuModule,
        MatButtonModule
    ]
})
export class MenuDeveloperModule { }
