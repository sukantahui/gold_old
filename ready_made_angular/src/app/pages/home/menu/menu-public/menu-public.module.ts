import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuPublicRoutingModule } from './menu-public-routing.module';
import { MenuPublicComponent } from './menu-public.component';
import {AuthModule} from '../../auth/auth.module';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MenuItemModule} from '../menu-item/menu-item.module';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';


@NgModule({
    declarations: [
        MenuPublicComponent
    ],
    exports: [
        MenuPublicComponent
    ],
    imports: [
        CommonModule,
        MenuPublicRoutingModule,
        AuthModule,
        MatButtonModule,
        MenuItemModule,
        MatMenuModule
        // _MatMenuDirectivesModule
    ]
})
export class MenuPublicModule { }
