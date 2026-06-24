import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SilverFormRoutingModule } from './silver-form-routing.module';
import { SilverFormComponent } from './silver-form.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        SilverFormComponent
    ],
    exports: [
        SilverFormComponent
    ],
    imports: [
        CommonModule,
        SilverFormRoutingModule,
        ReactiveFormsModule
    ]
})
export class SilverFormModule { }
