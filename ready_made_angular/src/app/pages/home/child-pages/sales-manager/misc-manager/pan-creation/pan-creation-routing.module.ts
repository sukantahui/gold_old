import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanCreationComponent } from './pan-creation.component';

const routes: Routes = [{ path: '', component: PanCreationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanCreationRoutingModule { }
