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
  selector: 'app-mcq-multi-display',
  templateUrl: './mcq-multi-display.component.html',
  styleUrls: ['./mcq-multi-display.component.scss'],
})
export class McqMultiDisplayComponent implements OnInit {
  @Input('sectionIndex') sectionIndex: any;
  @Input('columnIndex') columnIndex: any;
  @Input('pushedIndex') pushedIndex: any;
  @Input('data') data: any;
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
  singleMcqForm: any = this.fb.group({
    question: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required],
    }),
    choices: this.fb.array([]),
  });
  constructor(
    public authToolService: AuthToolService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.configForm.setValue(this.data.config);
    this.setSingleMcqForm();
  }
  setSingleMcqForm() {
    this.singleMcqForm
      .get('question')
      .setValue(this.data.content.data.question);
    this.data.content.data.choices.forEach((item: any) => {
      this.choices.push(this.newChoice(item));
    });
  }
  newChoice(data: any = null) {
    return this.fb.group({
      choice: [data ? data.choice : null, Validators.required],
      score: [
        data ? data.score : 0,
        [Validators.required, Validators.pattern('-?[0-9]{1,3}')],
      ],
    });
  }
  displayConfig() {
    this.display = true;
  }
  get choices(): any {
    return this.singleMcqForm.controls['choices'] as FormArray;
  }
  addChoice() {
    this.choices.push(this.newChoice());
  }
  deleteChoice(index: number) {
    this.choices.removeAt(index);
  }

  saveQuestions() {
    if (this.singleMcqForm.invalid || this.configForm.invalid) return;
    this.authToolService.updateSelectionQuestionColumn({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      config: this.configForm.value,
      content: this.singleMcqForm.value,
    });
    this.data.config = this.configForm.value;
    this.data.content.data = this.singleMcqForm.value;
    this.display = false;
  }

  deleteQuestionSelection() {
    this.authToolService.deleteSelectionColumn({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
    });
  }
  drangAndDropContent(event: any) {
    this.authToolService.changeChoicesOfColumnPosition({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      event,
    });
    this.choices.setValue(this.data.content.data.choices);
  }
}
