import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-open-question-display',
  templateUrl: './open-question-display.component.html',
  styleUrls: ['./open-question-display.component.scss']
})
export class OpenQuestionDisplayComponent implements OnInit {
  @Input('sectionIndex') sectionIndex: any;
  @Input('columnIndex') columnIndex: any;
  @Input('pushedIndex') pushedIndex: any;
  @Input('data') data: any;
  questionForm: FormGroup = new FormGroup({
    answer: new FormControl(null, { validators: [] }),
  });
  constructor(public studentService: StudentService) { }
  ngOnInit(): void {
    let anws:any = this.studentService.getOpenQuestion(this.sectionIndex,
      this.columnIndex,
      this.data.index)
    
      if(anws){
        this.questionForm.setValue({answer:anws})
      }
  }
  setOpenQuestion(){
    let answer = this.questionForm.value.answer
    if(answer){
      this.studentService.upsertOpenQuestion(
        this.sectionIndex,
        this.columnIndex,
        this.data.index,
        this.questionForm.value.answer
      )
    }else{
      this.studentService.deleteOpenQuestion(
        this.sectionIndex,
        this.columnIndex,
        this.data.index
      )
    }
  }
}
