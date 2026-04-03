import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FineGoldFormComponent } from './fine-gold-form.component';

const routes: Routes = [{ path: '', component: FineGoldFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FineGoldFormRoutingModule { }
