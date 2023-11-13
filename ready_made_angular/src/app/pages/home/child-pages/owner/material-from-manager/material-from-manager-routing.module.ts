import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialFromManagerComponent } from './material-from-manager.component';

const routes: Routes = [{ path: '', component: MaterialFromManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialFromManagerRoutingModule { }
