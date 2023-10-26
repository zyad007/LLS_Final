import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { GradeBookRoutingModule } from './grade-book-routing.module';
import { ExperimentGradeComponent } from './pages/experiment-grade/experiment-grade.component';
import { GradingDetailsComponent } from './pages/grading-details/grading-details.component';
import { GradingExTableComponent } from './pages/grading-ex-table/grading-ex-table.component';
import { TrialExperimentComponent } from './pages/trial-experiment/trial-experiment.component';

@NgModule({
  declarations: [
    // GradeBookComponent

    GradingDetailsComponent,
    GradingExTableComponent,
    ExperimentGradeComponent,
    TrialExperimentComponent,
    // TrailDetailsComponent,
    // McqMultiByAnswerComponent,
    // McqSingleByAnswerComponent,
    // OpenByAnswerComponent,
    // TrueFalseByAnswerComponent,
    // GradingContentComponent,
  ],
  imports: [
    CommonModule,
    GradeBookRoutingModule,
    DialogModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
  ],
})
export class GradeBookModule {}
