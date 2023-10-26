import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateExperimentComponent } from './pages/create-experiment/create-experiment.component';
import { ShExDetailsComponent } from './pages/sh-ex-details/sh-ex-details.component';
import { ShowExperimentComponent } from './pages/show-experiment/show-experiment.component';

const routes: Routes = [
  { path: '', component: ShowExperimentComponent, title: 'Show EXperiments' },
  {
    path: 'sh-details/:id',
    component: ShExDetailsComponent,
    title: 'Show EXperiments Details',
  },
  {
    path: 'create-ex',
    component: CreateExperimentComponent,
    title: 'Create EXperiments',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowExperimentRoutingModule {}
