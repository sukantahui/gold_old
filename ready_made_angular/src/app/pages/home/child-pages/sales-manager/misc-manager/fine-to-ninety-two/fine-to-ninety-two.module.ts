import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FineToNinetyTwoRoutingModule } from './fine-to-ninety-two-routing.module';
import { FineToNinetyTwoComponent } from './fine-to-ninety-two.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    FineToNinetyTwoComponent
  ],
    imports: [
        CommonModule,
        FineToNinetyTwoRoutingModule,
        NgSelectModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule
    ]
})
export class FineToNinetyTwoModule { }
