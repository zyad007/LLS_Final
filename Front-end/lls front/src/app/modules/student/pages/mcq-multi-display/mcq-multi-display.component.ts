import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';

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
  chooices: any[] = [];
  constructor(public studentService: StudentService) {}

  ngOnInit(): void {
    let anws: any = this.studentService.getMultiMcq(
      this.sectionIndex,
      this.columnIndex,
      this.data.index
    );
    if (anws) {
      this.chooices = anws.map((item: any) => item.choiceId);
    }
  }
  setMultiMcq() {
    let data: any[] = this.chooices.map((item: any) => ({ choiceId: item }));
    console.log(data);

    if (!data.length) {
      this.studentService.deleteMultiMcq(
        this.sectionIndex,
        this.columnIndex,
        this.data.index
      );
    } else {
      this.studentService.upsertAnswerMultiMcq(
        this.sectionIndex,
        this.columnIndex,
        this.data.index,
        data
      );
    }
  }
}
