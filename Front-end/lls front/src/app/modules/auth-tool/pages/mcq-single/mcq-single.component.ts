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
  selector: 'app-mcq-single',
  templateUrl: './mcq-single.component.html',
  styleUrls: ['./mcq-single.component.scss'],
})
export class McqSingleComponent implements OnInit {
  @Input('sectionIndex') sectionIndex: any;
  @Input('columnIndex') columnIndex: any;
  @Input('pushedIndex') pushedIndex: any;
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
  display = false;
  singleMcqForm: any = this.fb.group({
    question: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required],
    }),
    choices: this.fb.array([]),
  });
  invalidScore = false;
  localObjects!: any;
  constructor(
    public authToolService: AuthToolService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createEmptyObjectToLocalStorege();
    this.configForm.setValue(this.localObjects.config);
    this.setSingleQuestionForm();
  }
  newChoice(data: any = null) {
    return this.fb.group({
      choice: [data ? data.choice : null, Validators.required],
      score: [
        data ? data.score : 0,
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
      localStorageDate.data = {};
      this.authToolService.updateLocalStorage();
    }
    this.localObjects = localStorageDate;
  }

  deleteChoice(index: number) {
    this.choices.removeAt(index);
    this.updateLocalData();
  }

  setSingleQuestionForm() {
    if (this.localObjects.data?.choices?.length) {
      this.singleMcqForm
        .get('question')
        .setValue(this.localObjects.data.question);
      this.localObjects.data.choices.forEach((item: any) => {
        this.choices.push(this.newChoice(item));
      });
    } else {
      this.addChoice();
      this.addChoice();
    }
  }

  addChoice() {
    this.choices.push(this.newChoice());
    this.updateLocalData();
  }

  get choices(): any {
    return this.singleMcqForm.controls['choices'] as FormArray;
  }

  updateLocalData() {
    this.invalidScore = false;
    let counter = 0;
    let values: any[] = this.choices.value;
    for (let i = 0; i < values.length; i++) {
      if (values[i].score) {
        counter += 1;
        if (counter > 1) break;
      }
    }
    if (counter > 1) {
      this.invalidScore = true;
      return;
    }
    this.authToolService.addDataToFormColum({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      content: { ...this.localObjects, data: this.singleMcqForm.value },
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
    if (this.singleMcqForm.invalid || this.invalidScore) {
      this.singleMcqForm.markAllAsTouched();
      return;
    }
    let openqQuestions: any = this.authToolService.newSingeMcqQuestion();
    openqQuestions.config = {
      ...openqQuestions.config,
      ...this.configForm.value,
    };
    openqQuestions.content.data = this.singleMcqForm.value;
    this.authToolService.createSelectionColumn({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      content: openqQuestions,
    });
  }
}
