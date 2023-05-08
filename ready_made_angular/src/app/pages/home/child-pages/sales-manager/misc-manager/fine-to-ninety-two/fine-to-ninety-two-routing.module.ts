import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FineToNinetyTwoComponent } from './fine-to-ninety-two.component';

const routes: Routes = [{ path: '', component: FineToNinetyTwoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FineToNinetyTwoRoutingModule { }
