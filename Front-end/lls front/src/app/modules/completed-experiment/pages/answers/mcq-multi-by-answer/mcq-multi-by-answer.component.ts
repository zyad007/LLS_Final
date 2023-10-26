import { Component, Input, OnInit } from '@angular/core';
import { CompletedExperimentService } from '../../../services/completed-experiment.service';

@Component({
  selector: 'mcq-multi-by-answer',
  templateUrl: './mcq-multi-by-answer.component.html',
  styleUrls: ['./mcq-multi-by-answer.component.scss'],
})
export class McqMultiByAnswerComponent implements OnInit {
  @Input('sectionIndex') sectionIndex: any;
  @Input('columnIndex') columnIndex: any;
  @Input('pushedIndex') pushedIndex: any;
  @Input('studentAnswer') studentAnswer: any;
  @Input('data') data: any;
  @Input('isAvg') isAvg: boolean = false;
  chooices: any[] = [];
  dataToSave: any;
  constructor(public gradingService: CompletedExperimentService) {}

  ngOnInit(): void {
    if (!this.isAvg) {
      this.dataToSave = this.gradingService.getMultiMcq(
        this.sectionIndex,
        this.columnIndex,
        this.data.index
      );

      this.chooices = this.dataToSave.studentAnswers.choices.map(
        (item: any) => item.choiceId
      );
    }
  }
}
