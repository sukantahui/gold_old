import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSalesManagerComponent } from './menu-sales-manager.component';

const routes: Routes = [{ path: '', component: MenuSalesManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuSalesManagerRoutingModule { }
