import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignedExperimentRoutingModule } from './assigned-experiment-routing.module';
import { AssignedExperimentComponent } from './pages/assigned-experiment/assigned-experiment.component';
import { AssignedExperimentDetailsComponent } from './pages/assigned-experiment-details/assigned-experiment-details.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    AssignedExperimentComponent,
    AssignedExperimentDetailsComponent
  ],
  imports: [
    CommonModule,
    AssignedExperimentRoutingModule,
    SharedModule
  ]
})
export class AssignedExperimentModule { }
