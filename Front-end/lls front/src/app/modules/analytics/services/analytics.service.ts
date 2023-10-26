import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  sections: any[] = [];
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
  isExperiment = true;
  isCourse = false;
  constructor() {}
  setSections(questions: any[]) {
    questions.forEach((section: any) => {
      for (let i = 1; i <= 3; i++) {
        section['column' + i].forEach((column: any) => {
          column.content.data = JSON.parse(column.content.data);
        });
      }
    });
    this.sections = questions;
  }
}
