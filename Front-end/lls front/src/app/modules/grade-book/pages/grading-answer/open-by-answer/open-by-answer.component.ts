import { Component, Input, OnInit } from '@angular/core';
import { GradeBookService } from '../../../services/grade-book.service';

@Component({
  selector: 'app-open-by-answer',
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

  constructor(public gradingService: GradeBookService) {}
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
