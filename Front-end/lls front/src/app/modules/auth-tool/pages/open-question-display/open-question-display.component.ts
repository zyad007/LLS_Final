import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthToolService } from '../../services/auth-tool.service';

@Component({
  selector: 'app-open-question-display',
  templateUrl: './open-question-display.component.html',
  styleUrls: ['./open-question-display.component.scss']
})
export class OpenQuestionDisplayComponent implements OnInit {
  @Input('sectionIndex') sectionIndex: any;
  @Input('columnIndex') columnIndex: any;
  @Input('pushedIndex') pushedIndex: any;
  @Input('data') data: any;
  display = false;
  gradingOptions = ['Manual', 'Auto', 'ungraded']
  configForm: any = new FormGroup({
    help: new FormControl(null, {
      updateOn: 'change',
      validators: [
      ],
    }),
    answeringTime: new FormControl(null, {
      updateOn: 'change',
      validators: [
        Validators.pattern('[0-9]{1,3}')
      ],
    }),
    showCountdown: new FormControl(null, {
      updateOn: 'change',
      validators: [
      ],
    }),
    grading: new FormControl('Manual', {
      updateOn: 'change',
      validators: [
      ],
    }),
    showCorrectAnswer: new FormControl(null, {
      updateOn: 'change',
      validators: [
      ],
    }),
  });
  questionForm: any = new FormGroup({
    question: new FormControl(null, { validators: [Validators.required] }),
    answer: new FormControl(null, { validators: [Validators.required] }),
    score: new FormControl(null, { validators: [Validators.required, Validators.pattern('[0-9]{1,3}')] }),
  });
  constructor(public authToolService: AuthToolService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.configForm.setValue(this.data.config);
    this.questionForm.setValue(this.data.content.data)
  }

  newQuestion(data: any = null) {
    return this.fb.group({
      question: [data ? data.question : null, Validators.required],
      answer: [data ? data.answer : null, Validators.required],
      score: [data ? data.score : null, [Validators.required, Validators.pattern('[0-9]{1,3}')]],
    })
  }
  displayConfig() {
    this.display = true
  }


  saveQuestions() {
    if (this.questionForm.invalid || this.configForm.invalid) return
    this.authToolService.updateSelectionQuestionColumn({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      config: this.configForm.value,
      content: this.questionForm.value
    })
    this.data.config = this.configForm.value;
    this.data.content.data = this.questionForm.value
    this.display = false;
  }
  deleteQuestionSelection() {
    this.authToolService.deleteSelectionColumn({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
    })
  }
  drangAndDropContent(event: any) {
    this.authToolService.changeContentOfColumnPosition({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      event,
    })
    this.questionForm.setValue(this.data.content.data)

  }

}
