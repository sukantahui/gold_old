import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialToManagerComponent } from './material-to-manager.component';

const routes: Routes = [{ path: '', component: MaterialToManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialToManagerRoutingModule { }
