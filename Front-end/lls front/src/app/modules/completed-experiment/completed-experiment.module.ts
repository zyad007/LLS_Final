import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CompletedExperimentRoutingModule } from './completed-experiment-routing.module';
import { GradingContentComponent } from './pages/answers/grading-content/grading-content.component';
import { McqMultiByAnswerComponent } from './pages/answers/mcq-multi-by-answer/mcq-multi-by-answer.component';
import { McqSingleByAnswerComponent } from './pages/answers/mcq-single-by-answer/mcq-single-by-answer.component';
import { OpenByAnswerComponent } from './pages/answers/open-by-answer/open-by-answer.component';
import { TrueFalseByAnswerComponent } from './pages/answers/true-false-by-answer/true-false-by-answer.component';
import { CompletedDetailsComponent } from './pages/completed-details/completed-details.component';
import { CompletedExperimentComponent } from './pages/completed-experiment/completed-experiment.component';

@NgModule({
  declarations: [
    CompletedExperimentComponent,
    CompletedDetailsComponent,
    McqMultiByAnswerComponent,
    McqSingleByAnswerComponent,
    OpenByAnswerComponent,
    TrueFalseByAnswerComponent,
    GradingContentComponent,
  ],
  imports: [
    CommonModule,
    CompletedExperimentRoutingModule,
    SharedModule,
    DialogModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
  ],
})
export class CompletedExperimentModule {}
