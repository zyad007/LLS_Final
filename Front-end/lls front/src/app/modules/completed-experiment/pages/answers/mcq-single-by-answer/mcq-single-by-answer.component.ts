import { Component, Input, OnInit } from '@angular/core';
import { CompletedExperimentService } from '../../../services/completed-experiment.service';

@Component({
  selector: 'mcq-single-by-answer',
  templateUrl: './mcq-single-by-answer.component.html',
  styleUrls: ['./mcq-single-by-answer.component.scss'],
})
export class McqSingleByAnswerComponent implements OnInit {
  @Input('sectionIndex') sectionIndex: any;
  @Input('columnIndex') columnIndex: any;
  @Input('pushedIndex') pushedIndex: any;
  @Input('studentAnswer') studentAnswer: any;
  @Input('data') data: any;
  @Input('isAvg') isAvg: boolean = false;
  chooice = null;
  dataToSave: any;
  constructor(public gradingService: CompletedExperimentService) {}

  ngOnInit(): void {
    if (!this.isAvg) {
      this.dataToSave = this.gradingService.getsingleMcq(
        this.sectionIndex,
        this.columnIndex,
        this.data.index
      );

      this.chooice = this.dataToSave.studentAnswers.choices[0].choiceId;
    }
  }
}
