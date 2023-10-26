import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './pages/student/student.component';
import { ExperimentComponent } from './pages/experiment/experiment.component';
import { ContentDisplayComponent } from './pages/content-display/content-display.component';
import { TrueFalseDisplayComponent } from './pages/true-false-display/true-false-display.component';
import { OpenQuestionDisplayComponent } from './pages/open-question-display/open-question-display.component';
import { McqSingleDisplayComponent } from './pages/mcq-single-display/mcq-single-display.component';
import { McqMultiDisplayComponent } from './pages/mcq-multi-display/mcq-multi-display.component';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms'; 
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    StudentComponent,
    ExperimentComponent,
    ContentDisplayComponent,
    TrueFalseDisplayComponent,
    OpenQuestionDisplayComponent,
    McqSingleDisplayComponent,
    McqMultiDisplayComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    StudentRoutingModule,
    FormsModule,
    RadioButtonModule,
    DialogModule,
    SharedModule
  ]
})
export class StudentModule { }
