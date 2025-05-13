import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessStatusComponent } from './business-status.component';

const routes: Routes = [{ path: '', component: BusinessStatusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessStatusRoutingModule { }
