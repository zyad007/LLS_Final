import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthToolService } from '../../services/auth-tool.service';

@Component({
  selector: 'app-true-false',
  templateUrl: './true-false.component.html',
  styleUrls: ['./true-false.component.scss'],
})
export class TrueFalseComponent implements OnInit {
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
  truOrFlaseForm = this.fb.group({
    truOrFlase: this.fb.array([]),
  });
  localObjects!: any;
  constructor(
    public authToolService: AuthToolService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createEmptyObjectToLocalStorege();
    this.configForm.setValue(this.localObjects.config);
    this.setTrueOrFalseForm();
  }
  newQuestion(data: any = null) {
    return this.fb.group({
      question: [data ? data.question : null, Validators.required],
      answer: [data ? data.answer : null, Validators.required],
      score: [
        data ? data.score : null,
        [Validators.required, Validators.pattern('[0-9]{1,3}')],
      ],
    });
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
      localStorageDate.data = [];
      this.authToolService.updateLocalStorage();
    }
    this.localObjects = localStorageDate;
  }

  deleteQuestion(index: number) {
    this.questionsForm.removeAt(index);
    this.updateLocalData();
  }

  setTrueOrFalseForm() {
    if (this.localObjects.data.length) {
      this.localObjects.data.forEach((item: any) => {
        this.questionsForm.push(this.newQuestion(item));
      });
    } else {
      this.addQuestion();
    }
  }

  addQuestion() {
    this.questionsForm.push(this.newQuestion());
    this.updateLocalData();
  }

  get questionsForm(): any {
    return this.truOrFlaseForm.controls['truOrFlase'] as FormArray;
  }

  updateLocalData() {
    this.authToolService.addDataToFormColum({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      content: { ...this.localObjects, data: [...this.questionsForm.value] },
    });
  }

  deleteTrueOrFalseQuestions() {
    this.authToolService.deleteItemFromFormColumnFrom({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
    });
  }
  saveQuestions() {
    if (this.truOrFlaseForm.invalid) {
      this.questionsForm.markAllAsTouched();
      return;
    }
    let newTrueAndFalse: any = this.authToolService.newTrueOrFalse();
    newTrueAndFalse.config = {
      ...newTrueAndFalse.config,
      ...this.configForm.value,
    };
    this.questionsForm.value.forEach((item: any) => {
      newTrueAndFalse.content.data.push(item);
    });
    this.authToolService.createSelectionColumn({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      content: newTrueAndFalse,
    });
  }
}
