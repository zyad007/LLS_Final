import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentGradeComponent } from './pages/experiment-grade/experiment-grade.component';
import { GradeBookComponent } from './pages/grade-book/grade-book.component';
import { GradingDetailsComponent } from './pages/grading-details/grading-details.component';
import { TrailDetailsComponent } from './pages/trail-details/trail-details.component';
import { TrialExperimentComponent } from './pages/trial-experiment/trial-experiment.component';

const routes: Routes = [
  { path: '', component: GradeBookComponent },
  { path: 'gr-details/:id', component: GradingDetailsComponent },
  { path: 'gr-experiment/:idd/:expIdd', component: ExperimentGradeComponent },
  {
    path: 'trial/:idd/:expIdd/:gradeBookId',
    component: TrialExperimentComponent,
  },
  {
    path: 'trial-details/:idd/:expIdd/:gradeBookId/:trialIdd',
    component: TrailDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradeBookRoutingModule {}
