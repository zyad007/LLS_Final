import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
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
  private localStoreName = 'student-expirement';
  private id = '';
  constructor() {}

  setSections(responseSection: any[], sectionId: any = null) {
    responseSection.forEach((section: any, sectionIndex: number) => {
      for (let i = 1; i <= 3; i++) {
        section['column' + i].forEach((column: any, columnIndex: number) => {
          column.content.data = JSON.parse(column.content.data);
        });
      }
    });
    this.id = sectionId;
    this.sections = responseSection;
    this.setAnswers();
  }
  setAnswers() {
    let expirement: any = localStorage.getItem(this.id + this.localStoreName);
    if (!expirement) {
      this.answers = this.sections.map((section: any) =>
        this.newSection(section.index, section.title)
      );
      this.updateLocalStorage();
    } else {
      this.answers = JSON.parse(expirement);
    }
  }
  updateLocalStorage() {
    localStorage.setItem(
      this.id + this.localStoreName,
      JSON.stringify(this.answers)
    );
  }
  delteLocalStorage() {
    localStorage.removeItem(this.id + this.localStoreName);
    this.answers = [];
  }
  upsertAnswerTrueOrFalse(
    sectionId: any,
    columnNumber: any,
    columnIndex: any,
    statementId: any,
    answer: any
  ) {
    let column: any[] = this.answers[sectionId]['column' + columnNumber];
    if (!column.length) {
      let newContent: any = this.newTrueAndFalse(columnIndex);
      newContent.studentAnswers.statements.push({
        statementId: statementId,
        answer: answer,
      });
      column.push(newContent);
    } else {
      let existQuestion = false;
      column = column.map((item: any) => {
        if (item.type == this.trueOrFalseType && item.index == columnIndex) {
          existQuestion = true;
          let exists = false;
          item.studentAnswers.statements = item.studentAnswers.statements.map(
            (statement: any) => {
              if (statement.statementId == statementId) {
                statement.answer = answer;
                exists = true;
              }
              return statement;
            }
          );
          if (!exists) {
            item.studentAnswers.statements.push({
              statementId: statementId,
              answer: answer,
            });
          }
          return item;
        } else return item;
      });
      if (!existQuestion) {
        let newContent: any = this.newTrueAndFalse(columnIndex);
        newContent.studentAnswers.statements.push({
          statementId: statementId,
          answer: answer,
        });
        column.push(newContent);
      }
    }
    this.answers[sectionId]['column' + columnNumber] = column;
    this.updateLocalStorage();
  }
  upsertAnswerSingleMcq(
    sectionId: any,
    columnNumber: any,
    columnIndex: any,
    choiceId: any
  ) {
    let column: any[] = this.answers[sectionId]['column' + columnNumber];
    if (!column.length) {
      let newContent: any = this.newSingleMcq(columnIndex);
      newContent.studentAnswers.choices.push({ choiceId });
      column.push(newContent);
    } else {
      let exists = false;
      column = column.map((item: any) => {
        if (item.type == this.singleMcqType && item.index == columnIndex) {
          item.studentAnswers.choices[0] = { choiceId };
          exists = true;
          return item;
        } else return item;
      });
      if (!exists) {
        let newContent: any = this.newSingleMcq(columnIndex);
        newContent.studentAnswers.choices.push({ choiceId });
        column.push(newContent);
      }
    }
    this.answers[sectionId]['column' + columnNumber] = column;
    this.updateLocalStorage();
  }
  upsertAnswerMultiMcq(
    sectionId: any,
    columnNumber: any,
    columnIndex: any,
    choices: any[]
  ) {
    let column: any[] = this.answers[sectionId]['column' + columnNumber];
    if (!column.length) {
      let newContent: any = this.newMultiMcq(columnIndex);
      newContent.studentAnswers.choices = choices;
      column.push(newContent);
    } else {
      let exists = false;
      column = column.map((item: any) => {
        if (item.type == this.multiMcqType && item.index == columnIndex) {
          item.studentAnswers.choices = choices;
          exists = true;
          return item;
        } else return item;
      });
      if (!exists) {
        let newContent: any = this.newMultiMcq(columnIndex);
        newContent.studentAnswers.choices.push(choices);
        column.push(newContent);
      }
    }
    this.answers[sectionId]['column' + columnNumber] = column;
    this.updateLocalStorage();
  }
  upsertOpenQuestion(
    sectionId: any,
    columnNumber: any,
    columnIndex: any,
    answer: any
  ) {
    let column: any[] = this.answers[sectionId]['column' + columnNumber];
    if (!column.length) {
      let newContent: any = this.newOpenQuestion(columnIndex);
      newContent.studentAnswers.answer = answer;
      column.push(newContent);
    } else {
      let exists = false;
      column = column.map((item: any) => {
        if (item.type == this.openQuestionType && item.index == columnIndex) {
          item.studentAnswers.answer = answer;
          exists = true;
          return item;
        } else return item;
      });
      if (!exists) {
        let newContent: any = this.newOpenQuestion(columnIndex);
        newContent.studentAnswers.answer = answer;
        column.push(newContent);
      }
    }
    this.answers[sectionId]['column' + columnNumber] = column;
    this.updateLocalStorage();
  }
  getTrueOrFalse(sectionId: any, columnNumber: any, columnIndex: any) {
    try {
      return this.answers[sectionId]['column' + columnNumber].filter(
        (item: any) =>
          item.type == this.trueOrFalseType && item.index == columnIndex
      )[0].studentAnswers.statements;
    } catch {
      return null;
    }
  }
  getsingleMcq(sectionId: any, columnNumber: any, columnIndex: any) {
    try {
      return this.answers[sectionId]['column' + columnNumber].filter(
        (item: any) =>
          item.type == this.singleMcqType && item.index == columnIndex
      )[0].studentAnswers.choices[0];
    } catch {
      return null;
    }
  }
  deleteMultiMcq(sectionId: any, columnNumber: any, columnIndex: any) {
    try {
      this.answers[sectionId]['column' + columnNumber] = this.answers[
        sectionId
      ]['column' + columnNumber].filter(
        (item: any) =>
          item.type != this.multiMcqType && item.index != columnIndex
      );
      this.updateLocalStorage();
    } catch {}
  }
  deleteOpenQuestion(sectionId: any, columnNumber: any, columnIndex: any) {
    try {
      this.answers[sectionId]['column' + columnNumber] = this.answers[
        sectionId
      ]['column' + columnNumber].filter(
        (item: any) =>
          item.type != this.openQuestionType && item.index != columnIndex
      );
      this.updateLocalStorage();
    } catch {}
  }
  getMultiMcq(sectionId: any, columnNumber: any, columnIndex: any) {
    try {
      return this.answers[sectionId]['column' + columnNumber].filter(
        (item: any) =>
          item.type == this.multiMcqType && item.index == columnIndex
      )[0].studentAnswers.choices;
    } catch {
      return null;
    }
  }
  getOpenQuestion(sectionId: any, columnNumber: any, columnIndex: any) {
    try {
      return this.answers[sectionId]['column' + columnNumber].filter(
        (item: any) =>
          item.type == this.openQuestionType && item.index == columnIndex
      )[0].studentAnswers.answer;
    } catch {
      return null;
    }
  }
  newSection(index: any = null, title: any = '') {
    return {
      index: index,
      title: title,
      column1: [],
      column2: [],
      column3: [],
    };
  }
  newTrueAndFalse(index: any) {
    return {
      index: index,
      mainType: this.questionType,
      type: this.trueOrFalseType,
      studentAnswers: {
        statements: [],
      },
    };
  }
  newSingleMcq(index: any) {
    return {
      index: index,
      mainType: this.questionType,
      type: this.singleMcqType,
      studentAnswers: {
        choices: [],
      },
    };
  }
  newMultiMcq(index: any) {
    return {
      index: index,
      mainType: this.questionType,
      type: this.multiMcqType,
      studentAnswers: {
        choices: [],
      },
    };
  }
  newOpenQuestion(index: any) {
    return {
      index: index,
      mainType: this.questionType,
      type: this.openQuestionType,
      studentAnswers: {
        answer: '',
      },
    };
  }
  parseForPreview(responseSection: any) {
    responseSection.forEach((section: any, sectionIndex: number) => {
      for (let i = 1; i <= 3; i++) {
        section['column' + i].forEach((column: any, columnIndex: number) => {
          column.content.data = JSON.parse(column.content.data);
        });
      }
    });
    return responseSection;
  }
}
