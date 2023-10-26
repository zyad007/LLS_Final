import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { AuthToolService } from '../../services/auth-tool.service';

@Component({
  selector: 'app-open-question',
  templateUrl: './open-question.component.html',
  styleUrls: ['./open-question.component.scss'],
})
export class OpenQuestionComponent implements OnInit {
  @Input('sectionIndex') sectionIndex: any;
  @Input('columnIndex') columnIndex: any;
  @Input('pushedIndex') pushedIndex: any;
  display = false;
  gradingOptions = ['Manual', 'Auto', 'ungraded'];
  configForm: any = new FormGroup({
    help: new FormControl(null, {
      updateOn: 'change',
      validators: [],
    }),
    answeringTime: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.pattern('[0-9]{1,3}')],
    }),
    showCountdown: new FormControl(null, {
      updateOn: 'change',
      validators: [],
    }),
    grading: new FormControl('Manual', {
      updateOn: 'change',
      validators: [],
    }),
    showCorrectAnswer: new FormControl(null, {
      updateOn: 'change',
      validators: [],
    }),
  });
  questionForm: any = new FormGroup({
    question: new FormControl(null, { validators: [Validators.required] }),
    answer: new FormControl(null, { validators: [Validators.required] }),
    score: new FormControl(null, {
      validators: [Validators.required, Validators.pattern('[0-9]{1,3}')],
    }),
  });
  localObjects!: any;
  constructor(
    public authToolService: AuthToolService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createEmptyObjectToLocalStorege();
    this.configForm.setValue(this.localObjects.config);
    this.questionForm.setValue(this.localObjects.data);
  }

  displayConfig() {
    this.display = true;
  }
  createConfigSection() {
    if (this.configForm.invalid) {
      this.configForm.markAllAsTouched();
      return;
    }
    this.authToolService.addDataToFormColum({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      content: { ...this.localObjects, config: { ...this.configForm.value } },
    });
    this.display = false;
  }

  createEmptyObjectToLocalStorege() {
    let localStorageDate = this.authToolService.getFormColum({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
    });
    if (!localStorageDate.config) {
      localStorageDate.config = this.configForm.value;
      this.authToolService.updateLocalStorage();
    }
    if (!localStorageDate.data) {
      localStorageDate.data = this.questionForm.value;
      this.authToolService.updateLocalStorage();
    }
    this.localObjects = localStorageDate;
  }

  updateLocalData() {
    this.authToolService.addDataToFormColum({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      content: { ...this.localObjects, data: { ...this.questionForm.value } },
    });
  }

  deleteOpenQuestions() {
    this.authToolService.deleteItemFromFormColumnFrom({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
    });
  }
  saveQuestions() {
    if (this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      return;
    }
    let openqQuestions: any = this.authToolService.newOpenQuestion();
    openqQuestions.config = {
      ...openqQuestions.config,
      ...this.configForm.value,
    };
    openqQuestions.content.data = { ...this.questionForm.value };
    this.authToolService.createSelectionColumn({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      content: openqQuestions,
    });
  }
}
