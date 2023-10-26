import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AllAnalyticsComponent } from './pages/all-analytics/all-analytics.component';
import { AnalyticsEroComponent } from './pages/analytics-ero/analytics-ero.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AnalyticsCourseComponent } from './pages/analyticss-course/analyticss-course.component';

@NgModule({
  declarations: [
    AnalyticsComponent,
    AnalyticsEroComponent,
    AnalyticsCourseComponent,
    AllAnalyticsComponent,
  ],
  imports: [CommonModule, AnalyticsRoutingModule, SharedModule],
})
export class AnalyticsModule {}
