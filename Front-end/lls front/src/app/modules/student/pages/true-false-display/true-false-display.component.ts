import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';

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
  chooices:any[] =[]

  constructor(public studentService: StudentService) { }
  ngOnInit(): void {
    let anws:any[] = this.studentService.getTrueOrFalse(this.sectionIndex,
      this.columnIndex,
      this.data.index)
    this.chooices =this.data.content.data.map(()=>null) 
    if(anws){
      anws.forEach((item:any)=>{
        this.chooices[item.statementId] = item.answer;
      })
    }
  }
  setTrueOrFalse(i:number){
    this.studentService.upsertAnswerTrueOrFalse(
      this.sectionIndex,
      this.columnIndex,
      this.data.index,
      i,
      this.chooices[i]
    )
  }



}
