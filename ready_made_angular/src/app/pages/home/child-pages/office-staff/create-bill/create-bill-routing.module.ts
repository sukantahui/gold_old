import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBillComponent } from './create-bill.component';

const routes: Routes = [{ path: '', component: CreateBillComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBillRoutingModule { }
