import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlossWithdrawnComponent } from './ploss-withdrawn.component';

const routes: Routes = [{ path: '', component: PlossWithdrawnComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlossWithdrawnRoutingModule { }
