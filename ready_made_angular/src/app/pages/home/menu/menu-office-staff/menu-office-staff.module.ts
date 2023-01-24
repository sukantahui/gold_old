import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuOfficeStaffRoutingModule } from './menu-office-staff-routing.module';
import { MenuOfficeStaffComponent } from './menu-office-staff.component';
import {MenuItemModule} from "../menu-item/menu-item.module";
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";


@NgModule({
    declarations: [
        MenuOfficeStaffComponent
    ],
    exports: [
        MenuOfficeStaffComponent
    ],
    imports: [
        CommonModule,
        MenuOfficeStaffRoutingModule,
        MenuItemModule,
        MatMenuModule,
        MatButtonModule
    ]
})
export class MenuOfficeStaffModule { }
