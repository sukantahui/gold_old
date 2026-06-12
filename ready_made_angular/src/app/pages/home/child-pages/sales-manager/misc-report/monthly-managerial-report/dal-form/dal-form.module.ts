import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DalFormRoutingModule } from './dal-form-routing.module';
import { DalFormComponent } from './dal-form.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        DalFormComponent
    ],
    exports: [
        DalFormComponent
    ],
    imports: [
        CommonModule,
        DalFormRoutingModule,
        ReactiveFormsModule
    ]
})
export class DalFormModule { }
