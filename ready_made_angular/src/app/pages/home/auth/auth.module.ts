import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {LoadingSpinnerModule} from '../../../shared/loading-spinner/loading-spinner.module';


@NgModule({
    declarations: [
        AuthComponent
    ],
    exports: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShowHidePasswordModule,
        MatInputModule,
        LoadingSpinnerModule
    ]
})
export class AuthModule { }
