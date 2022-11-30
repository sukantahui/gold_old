import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperHomeComponent } from './developer-home.component';

const routes: Routes = [{ path: '', component: DeveloperHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperHomeRoutingModule { }
