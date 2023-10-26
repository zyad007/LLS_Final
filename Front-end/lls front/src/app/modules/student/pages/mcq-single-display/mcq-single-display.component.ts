import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';

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
  chooice =null

  constructor(public studentService: StudentService) { }

  ngOnInit(): void {
    let anws:any = this.studentService.getsingleMcq(this.sectionIndex,
      this.columnIndex,
      this.data.index)
      if(anws)
      this.chooice = anws.choiceId
  }
  setSingleMcq(){
    this.studentService.upsertAnswerSingleMcq(
      this.sectionIndex,
      this.columnIndex,
      this.data.index,
      this.chooice
    )
  }

}
