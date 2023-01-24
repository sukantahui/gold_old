import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {TopModule} from './top/top.module';
import {AboutModule} from './about/about.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {AuthModule} from './auth/auth.module';
import {MenuModule} from './menu/menu.module';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatIconModule} from '@angular/material/icon';
import {WhyUsModule} from './why-us/why-us.module';
import {FeaturesModule} from './features/features.module';
import {PopularCoursesModule} from './popular-courses/popular-courses.module';
import {TrainerModule} from './trainer/trainer.module';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {PopoverModule} from 'ngx-smart-popover';
import {TestSectionModule} from "./test-section/test-section.module";
import {OfferSectionModule} from "./offer-section/offer-section.module";
import {CalloutSectionModule} from "./callout-section/callout-section.module";



@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
    imports: [
        HomeRoutingModule,
        TopModule,
        AboutModule,
        MatSidenavModule,
        MatCardModule,
        MenuModule,
        MatButtonModule,
        MatIconModule,
        WhyUsModule,
        FeaturesModule,
        PopularCoursesModule,
        TrainerModule,
        CommonModule,
        // _MatMenuDirectivesModule,
        MatMenuModule,
        PopoverModule,
        TestSectionModule,
        OfferSectionModule,
        CalloutSectionModule
    ]
})
export class HomeModule { }
