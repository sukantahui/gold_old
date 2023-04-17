import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LcReceiptComponent } from './lc-receipt.component';

const routes: Routes = [{ path: '', component: LcReceiptComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LcReceiptRoutingModule { }
