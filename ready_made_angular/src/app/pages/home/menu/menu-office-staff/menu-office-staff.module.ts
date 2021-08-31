import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuOfficeStaffRoutingModule } from './menu-office-staff-routing.module';
import { MenuOfficeStaffComponent } from './menu-office-staff.component';
import {MenuItemModule} from "../menu-item/menu-item.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";


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
