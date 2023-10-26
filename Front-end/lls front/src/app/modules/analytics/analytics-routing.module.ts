import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAnalyticsComponent } from './pages/all-analytics/all-analytics.component';
import { AnalyticsEroComponent } from './pages/analytics-ero/analytics-ero.component';

const routes: Routes = [
  { path: '', component: AllAnalyticsComponent, title: 'Analytics' },
  { path: 'ero/:id', component: AnalyticsEroComponent, title: 'Analytics-Ero' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
