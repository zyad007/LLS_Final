import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradeBookService {
  sections: any[] = [];
  answers: any[] = [];
  enumType = 'Enum';
  trueOrFalseType = 'TRUE_OR_FALSE_QUESTION_BLOCK';
  openQuestionType = 'OPEN_QUESTION_BLOCK';
  singleMcqType = 'SINGLE_SELECT_MCQ_BLOCK';
  multiMcqType = 'MULTI_SELECT_MCQ_BLOCK';
  textType = 'TEXT';
  codeType = 'CODE';
  imageType = 'IMAGE';
  videoType = 'MEDIA';
  iframeType = 'FRAME';
  questionType = 'QUESTION';
  contentType = 'CONTENT';
  private localStoreName = 'student-answer';
  private courseId = '';
  private expirementId = '';
  private trialId = '';
  private gradeid='';
  constructor() { }
  setSections(questions: any[],answers:any[], courseId: any = null,expirementId: any = null,gradeid:any=null,trialId: any = null) {
    questions.forEach((section: any) => {
      for (let i = 1; i <= 3; i++) {
        section['column' + i].forEach((column: any) => {
          column.content.data = JSON.parse(column.content.data);
        });
      }
    });
    this.courseId = courseId;
    this.expirementId = expirementId;
    this.courseId = courseId;
    this.trialId = trialId;
    this.gradeid = gradeid ; 
    this.sections = questions;
    this.answers = answers ; 
  }

  getMultiMcq(sectionId: any, columnNumber: any, columnIndex: any) {
    try {
      return this.answers[sectionId]['column' + columnNumber].filter(
        (item: any) =>
          item.type == this.multiMcqType && item.index == columnIndex
      )[0];
    } catch {
      return null;
    }
  }
  getsingleMcq(sectionId: any, columnNumber: any, columnIndex: any) {
    try {
      return this.answers[sectionId]['column' + columnNumber].filter(
        (item: any) =>
          item.type == this.singleMcqType && item.index == columnIndex
      )[0];
    } catch {
      return null;
    }
  }
  getTrueOrFalse(sectionId: any, columnNumber: any, columnIndex: any) {
    try {
      return this.answers[sectionId]['column' + columnNumber].filter(
        (item: any) =>
          item.type == this.trueOrFalseType && item.index == columnIndex
      )[0];
    } catch {
      return null;
    }
  }
  
  getOpenQuestion(sectionId: any, columnNumber: any, columnIndex: any) {
    try {
      return this.answers[sectionId]['column' + columnNumber].filter(
        (item: any) =>
          item.type == this.openQuestionType && item.index == columnIndex
      )[0];
    } catch {
      return null;
    }
  }
  checkEmptyScores(){
    for(let sect = 0 ; sect < this.answers.length ; sect++){
      let section:any= this.answers[sect]
      for (let i = 1; i <= 3; i++){
        let column:any = section['column' + i] ; 
        for(let j =0 ; j < column.length; j++){
          if(column[j].studentScore != 0 && !column[j].studentScore)
              return true  
          
        }
      } 
    }
    return false  
  }

}
