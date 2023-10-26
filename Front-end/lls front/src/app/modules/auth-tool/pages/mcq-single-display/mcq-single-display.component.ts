import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthToolService } from '../../services/auth-tool.service';

@Component({
  selector: 'app-mcq-single-display',
  templateUrl: './mcq-single-display.component.html',
  styleUrls: ['./mcq-single-display.component.scss']
})
export class McqSingleDisplayComponent implements OnInit {
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
  singleMcqForm: any = this.fb.group({
    question: new FormControl(null, {
      updateOn: 'change',
      validators: [
        Validators.required
      ],
    }),
    choices: this.fb.array([])
  })
  invalidScore = false;
  constructor(public authToolService: AuthToolService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.configForm.setValue(this.data.config);
    this.setSingleMcqForm()
  }
  setSingleMcqForm() {
    this.singleMcqForm.get("question").setValue(this.data.content.data.question)
    this.data.content.data.choices.forEach((item: any) => {
      this.choices.push(this.newChoice(item))
    })
  }
  newChoice(data: any = null) {
    return this.fb.group({
      choice: [data ? data.choice : null, Validators.required],
      score: [data ? data.score : null, [Validators.required, Validators.pattern('[0-9]{1,3}')]],
    })

  }
  displayConfig() {
    this.display = true
  }
  get choices(): any {
    return this.singleMcqForm.controls["choices"] as FormArray;
  }
  addChoice() {
    this.choices.push(this.newChoice())
  }
  deleteChoice(index: number) {
    this.choices.removeAt(index);
  }

  saveQuestions() {
    if (this.singleMcqForm.invalid || this.invalidScore || this.configForm.invalid) return;
    this.authToolService.updateSelectionQuestionColumn({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      config: this.configForm.value,
      content: this.singleMcqForm.value
    })
    this.data.config = this.configForm.value;
    this.data.content.data = this.singleMcqForm.value
    this.display = false;
  }

  checkScore() {
    this.invalidScore = false;
    let counter = 0
    let values: any[] = this.choices.value;
    for (let i = 0; i < values.length; i++) {
      if (values[i].score) {
        counter += 1
        if (counter > 1)
          break;
      }
    }
    if (counter > 1)
      this.invalidScore = true
  }
  deleteQuestionSelection() {
    this.authToolService.deleteSelectionColumn({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
    })
  }
  drangAndDropContent(event: any) {
    this.authToolService.changeChoicesOfColumnPosition({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      event,
    })
    this.choices.setValue(this.data.content.data.choices)
  }
}
