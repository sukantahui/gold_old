import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankingRoutingModule } from './banking-routing.module';
import { BankingComponent } from './banking.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';

import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessageModule} from "primeng/message";
import {FileUploadModule} from "primeng/fileupload";



@NgModule({
  declarations: [
    BankingComponent
  ],
    imports: [
        CommonModule,
        BankingRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        ToastModule,
        MessageModule,
        ConfirmDialogModule,
        FileUploadModule


    ]
})
export class BankingModule { }
