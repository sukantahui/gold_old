import {Input, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FineGoldFormRoutingModule } from './fine-gold-form-routing.module';
import { FineGoldFormComponent } from './fine-gold-form.component';
import {environment} from '../../../../../../../../environments/environment';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        FineGoldFormComponent
    ],
    exports: [
        FineGoldFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule   // ✅ MUST BE HERE
    ]
})
export class FineGoldFormModule {

}
