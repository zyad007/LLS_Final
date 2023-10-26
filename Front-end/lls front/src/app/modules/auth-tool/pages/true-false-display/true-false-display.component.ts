import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthToolService } from '../../services/auth-tool.service';
@Component({
  selector: 'app-true-false-display',
  templateUrl: './true-false-display.component.html',
  styleUrls: ['./true-false-display.component.scss']
})
export class TrueFalseDisplayComponent implements OnInit {
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
  truOrFlaseForm = this.fb.group({
    truOrFlase: this.fb.array([])
  })
  constructor(public authToolService: AuthToolService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.configForm.setValue(this.data.config);
    this.setTrueOrFalseFom()

  }
  setTrueOrFalseFom() {
    this.data.content.data.forEach((item: any) => {
      this.questionsForm.push(this.newQuestion(item))
    })
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
  setConfigForm() {
    this.data.config
  }


  deleteQuestion(index: number) {
    this.questionsForm.removeAt(index);
  }
  addQuestion() {
    this.questionsForm.push(this.newQuestion())

  }

  get questionsForm(): any {
    return this.truOrFlaseForm.controls["truOrFlase"] as FormArray;
  }

  saveQuestions() {
    if (this.truOrFlaseForm.invalid || this.configForm.invalid) return;
    this.authToolService.updateSelectionQuestionColumn({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      config: this.configForm.value,
      content: this.questionsForm.value
    })
    this.data.config = this.configForm.value;
    this.data.content.data = this.questionsForm.value
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
    this.questionsForm.setValue(this.data.content.data)

  }

}
