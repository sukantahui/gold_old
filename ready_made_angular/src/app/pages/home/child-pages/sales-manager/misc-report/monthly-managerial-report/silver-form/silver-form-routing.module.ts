import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SilverFormComponent } from './silver-form.component';

const routes: Routes = [{ path: '', component: SilverFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SilverFormRoutingModule { }
