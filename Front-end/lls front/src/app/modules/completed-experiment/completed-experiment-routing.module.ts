import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedDetailsComponent } from './pages/completed-details/completed-details.component';
import { CompletedExperimentComponent } from './pages/completed-experiment/completed-experiment.component';

const routes: Routes = [
  { path: '', component: CompletedExperimentComponent },
  { path: 'details/:idd', component: CompletedDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedExperimentRoutingModule {}
