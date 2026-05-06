import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanGoldFormRoutingModule } from './pan-gold-form-routing.module';
import { PanGoldFormComponent } from './pan-gold-form.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        PanGoldFormComponent
    ],
    exports: [
        PanGoldFormComponent
    ],
    imports: [
        CommonModule,
        PanGoldFormRoutingModule,
        ReactiveFormsModule
    ]
})
export class PanGoldFormModule { }
