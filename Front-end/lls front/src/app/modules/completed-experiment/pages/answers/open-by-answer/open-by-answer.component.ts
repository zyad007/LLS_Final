import { Component, Input, OnInit } from '@angular/core';
import { CompletedExperimentService } from '../../../services/completed-experiment.service';

@Component({
  selector: 'open-by-answer',
  templateUrl: './open-by-answer.component.html',
  styleUrls: ['./open-by-answer.component.scss'],
})
export class OpenByAnswerComponent implements OnInit {
  @Input('sectionIndex') sectionIndex: any;
  @Input('columnIndex') columnIndex: any;
  @Input('pushedIndex') pushedIndex: any;
  @Input('studentAnswer') studentAnswer: any;
  @Input('data') data: any;
  @Input('isAvg') isAvg: boolean = false;
  dataToSave: any;
  anwser: any = '';

  constructor(public gradingService: CompletedExperimentService) {}
  ngOnInit(): void {
    if (!this.isAvg) {
      this.dataToSave = this.gradingService.getOpenQuestion(
        this.sectionIndex,
        this.columnIndex,
        this.data.index
      );
      this.anwser = this.dataToSave.studentAnswers.answer;
    }
  }
}
