import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPettyCashComponent } from './menu-petty-cash.component';

const routes: Routes = [{ path: '', component: MenuPettyCashComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPettyCashRoutingModule { }
