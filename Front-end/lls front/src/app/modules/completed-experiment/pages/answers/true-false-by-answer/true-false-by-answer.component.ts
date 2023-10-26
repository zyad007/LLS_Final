import { Component, Input, OnInit } from '@angular/core';
import { CompletedExperimentService } from '../../../services/completed-experiment.service';

@Component({
  selector: 'true-false-by-answer',
  templateUrl: './true-false-by-answer.component.html',
  styleUrls: ['./true-false-by-answer.component.scss'],
})
export class TrueFalseByAnswerComponent implements OnInit {
  @Input('sectionIndex') sectionIndex: any;
  @Input('columnIndex') columnIndex: any;
  @Input('pushedIndex') pushedIndex: any;
  @Input('data') data: any;
  @Input('isAvg') isAvg: boolean = false;
  chooices: any[] = [];
  dataToSave: any;

  constructor(public gradingService: CompletedExperimentService) {}
  ngOnInit(): void {
    if (!this.isAvg) {
      this.dataToSave = this.gradingService.getTrueOrFalse(
        this.sectionIndex,
        this.columnIndex,
        this.data.index
      );

      let anws: any[] = this.dataToSave.studentAnswers.statements;
      this.chooices = this.data.content.data.map(() => null);
      if (anws) {
        anws.forEach((item: any) => {
          this.chooices[item.statementId] = item.answer;
        });
      }
    }
  }
}
