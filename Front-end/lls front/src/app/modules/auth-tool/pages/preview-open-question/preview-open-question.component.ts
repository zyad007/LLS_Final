import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-preview-open-question',
  templateUrl: './preview-open-question.component.html',
  styleUrls: ['./preview-open-question.component.scss']
})
export class PreviewOpenQuestionComponent implements OnInit {
  @Input('data') data: any;
  constructor() { }
  questionForm: FormGroup = new FormGroup({
    answer: new FormControl(null, { validators: [] }),
  });
  ngOnInit(): void {
  }

}
