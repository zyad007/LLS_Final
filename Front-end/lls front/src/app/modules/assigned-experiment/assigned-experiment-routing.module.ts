import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedExperimentDetailsComponent } from './pages/assigned-experiment-details/assigned-experiment-details.component';
import { AssignedExperimentComponent } from './pages/assigned-experiment/assigned-experiment.component';

const routes: Routes = [
  { path: '', component: AssignedExperimentComponent },
  {
    path: 'details/:idd',
    component: AssignedExperimentDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignedExperimentRoutingModule {}
