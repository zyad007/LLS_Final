import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { Interceptors } from 'src/app/core/services/interceptors.service';
import { PreviewContentComponent } from 'src/app/modules/auth-tool/pages/preview-content/preview-content.component';
import { PreviewMcqMultiComponent } from 'src/app/modules/auth-tool/pages/preview-mcq-multi/preview-mcq-multi.component';
import { PreviewMcqSingleComponent } from 'src/app/modules/auth-tool/pages/preview-mcq-single/preview-mcq-single.component';
import { PreviewOpenQuestionComponent } from 'src/app/modules/auth-tool/pages/preview-open-question/preview-open-question.component';
import { PreviewTrueFalseComponent } from 'src/app/modules/auth-tool/pages/preview-true-false/preview-true-false.component';
import { PreviewComponent } from 'src/app/modules/auth-tool/pages/preview/preview.component';
import { GradingContentComponent } from 'src/app/modules/grade-book/pages/grading-answer/grading-content/grading-content.component';
import { McqMultiByAnswerComponent } from 'src/app/modules/grade-book/pages/grading-answer/mcq-multi-by-answer/mcq-multi-by-answer.component';
import { McqSingleByAnswerComponent } from 'src/app/modules/grade-book/pages/grading-answer/mcq-single-by-answer/mcq-single-by-answer.component';
import { OpenByAnswerComponent } from 'src/app/modules/grade-book/pages/grading-answer/open-by-answer/open-by-answer.component';
import { TrueFalseByAnswerComponent } from 'src/app/modules/grade-book/pages/grading-answer/true-false-by-answer/true-false-by-answer.component';
import { TrailDetailsComponent } from 'src/app/modules/grade-book/pages/trail-details/trail-details.component';
import { FormsSpinnerComponent } from '../components/forms-spinner/forms-spinner.component';
import { InputsComponent } from '../inputs/inputs.component';
import { DescPipe } from '../pipes/desc.pipe';
import { SubPipe } from '../pipes/sub.pipe';
@NgModule({
  declarations: [
    DescPipe,
    SubPipe,
    InputsComponent,
    FormsSpinnerComponent,
    PreviewMcqSingleComponent,
    PreviewMcqMultiComponent,
    PreviewOpenQuestionComponent,
    PreviewTrueFalseComponent,
    PreviewContentComponent,
    PreviewComponent,
    TrailDetailsComponent,
    McqMultiByAnswerComponent,
    McqSingleByAnswerComponent,
    OpenByAnswerComponent,
    TrueFalseByAnswerComponent,
    GradingContentComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DragDropModule,
    PanelModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DialogModule,
    CheckboxModule,
    RadioButtonModule,
    ToastModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptors,
      multi: true,
    },
  ],
  exports: [
    DescPipe,
    SubPipe,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DragDropModule,
    PanelModule,
    InputsComponent,
    FormsSpinnerComponent,
    DialogModule,
    PreviewMcqSingleComponent,
    PreviewMcqMultiComponent,
    PreviewOpenQuestionComponent,
    PreviewTrueFalseComponent,
    PreviewContentComponent,
    PreviewComponent,
    CheckboxModule,
    RadioButtonModule,
    TrailDetailsComponent,
    McqMultiByAnswerComponent,
    McqSingleByAnswerComponent,
    OpenByAnswerComponent,
    TrueFalseByAnswerComponent,
    GradingContentComponent,
    ToastModule,
  ],
})
export class SharedModule {}
