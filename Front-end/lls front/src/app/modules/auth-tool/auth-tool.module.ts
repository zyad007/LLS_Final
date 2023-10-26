import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import * as DragModule from '@angular/cdk/drag-drop';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { FileUploadModule } from 'primeng/fileupload';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AuthToolRoutingModule } from './auth-tool-routing.module';
import { AuthToolComponent } from './pages/auth-tool/auth-tool.component';
import { ContentDisplayComponent } from './pages/content-display/content-display.component';
import { ContentComponent } from './pages/content/content.component';
import { McqMultiDisplayComponent } from './pages/mcq-multi-display/mcq-multi-display.component';
import { McqMultiComponent } from './pages/mcq-multi/mcq-multi.component';
import { McqSingleDisplayComponent } from './pages/mcq-single-display/mcq-single-display.component';
import { McqSingleComponent } from './pages/mcq-single/mcq-single.component';
import { OpenQuestionDisplayComponent } from './pages/open-question-display/open-question-display.component';
import { OpenQuestionComponent } from './pages/open-question/open-question.component';
import { TrueFalseDisplayComponent } from './pages/true-false-display/true-false-display.component';
import { TrueFalseComponent } from './pages/true-false/true-false.component';

@NgModule({
  declarations: [
    AuthToolComponent,
    McqSingleComponent,
    McqMultiComponent,
    TrueFalseComponent,
    ContentComponent,
    OpenQuestionComponent,
    ContentDisplayComponent,
    TrueFalseDisplayComponent,
    OpenQuestionDisplayComponent,
    McqSingleDisplayComponent,
    McqMultiDisplayComponent,
  ],
  imports: [
    CommonModule,
    AuthToolRoutingModule,
    SharedModule,
    DialogModule,
    DragDropModule,
    FileUploadModule,
    ListboxModule,
    DragModule.DragDropModule,
    EditorModule,
    CheckboxModule,
    RadioButtonModule,
  ],
})
export class AuthToolModule {}
