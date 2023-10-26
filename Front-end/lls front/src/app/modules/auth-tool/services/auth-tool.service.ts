import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthToolService {
  configTextEditor = {
    height: 500,
    menubar: true,
    plugins: [
      'image',
      'anchor',
      'charmap',
      'codesample',
      'table',
      'emoticons',
      'link',
      'lists',
      'media',
      'searchreplace',
      'visualblocks',
      'wordcount',
      'checklist',
      'mediaembed',
      'casechange',
      'export',
      'formatpainter',
      'pageembed',
      'linkchecker',
      'a11ychecker',
      'tinymcespellchecker',
      'permanentpen',
      'powerpaste',
      'advtable',
      'advcode',
      'editimage',
      'tableofcontents',
      'footnotes',
      'autocorrect',
      'typography',
      'inlinecss',
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor forecolor  blocks fontfamily fontsize underline strikethroug typography | \
      align  | \
      bullist numlist outdent indent | removeformat | \
      addcomment showcomments | spellcheckdialog a11ycheck  |  lineheight | checklist | emoticons charmap | \
      help',
  };
  configDisplay: any = {
    // height: 500,
    menubar: false,
    plugins: [],
    toolbar: '',
    readonly: true,
  };
  apiKey = 'lj30831xaglilun712eewhw1wggaa1774yz18apb0sm3mgtk';
  sections: any[] = [];
  enumType = 'Enum';
  trueOrFalseType = 'TRUE_OR_FALSE_QUESTION_BLOCK';
  openQuestionType = 'OPEN_QUESTION_BLOCK';
  singleMcqType = 'SINGLE_SELECT_MCQ_BLOCK';
  multiMcqType = 'MULTI_SELECT_MCQ_BLOCK';
  videoType = 'MEDIA';
  iframeType = 'FRAME';
  textType = 'TEXT';
  codeType = 'CODE';
  imageType = 'IMAGE';
  questionType = 'QUESTION';
  contentType = 'CONTENT';
  expirementId = '';
  constructor() {}
  pushSection(values: any) {
    this.sections.push(this.newSection(values));
    this.updateLocalStorage();
  }
  pushInFormcolumn(
    selectionIndex: number,
    columnIndex: number,
    currentActiveType: any,
    currentActiveText: any
  ) {
    this.sections[selectionIndex]['columnFrom' + columnIndex].push({
      type: currentActiveType,
      text: currentActiveText,
      data: {},
    });
    this.updateLocalStorage();
  }
  createSelectionColumn(data: any) {
    let column = this.sections[data.sectionIndex]['column' + data.columnIndex];
    column.push(data.content);

    this.deleteItemFromFormColumnFrom(data);
  }

  updateSelectionColumn(data: any) {
    let column = this.sections[data.sectionIndex]['column' + data.columnIndex];
    column[data.pushedIndex].content.data = data.content;
    this.updateLocalStorage();
  }
  updateSelectionQuestionColumn(data: any) {
    let column = this.sections[data.sectionIndex]['column' + data.columnIndex];
    column[data.pushedIndex].config = data.config;
    column[data.pushedIndex].content.data = data.content;
    this.updateLocalStorage();
  }

  deleteSelectionColumn(data: any) {
    let column = this.sections[data.sectionIndex]['column' + data.columnIndex];
    column.splice(data.pushedIndex, 1);
    this.updateLocalStorage();
  }
  changeContentOfColumnPosition(data: any) {
    let column =
      this.sections[data.sectionIndex]['column' + data.columnIndex][
        data.pushedIndex
      ].content.data;
    moveItemInArray(column, data.event.previousIndex, data.event.currentIndex);
    this.updateLocalStorage();
  }
  changeChoicesOfColumnPosition(data: any) {
    let column =
      this.sections[data.sectionIndex]['column' + data.columnIndex][
        data.pushedIndex
      ].content.data.choices;
    moveItemInArray(column, data.event.previousIndex, data.event.currentIndex);
    this.updateLocalStorage();
  }

  changeSelectionColumnPosition(data: any) {
    let column = this.sections[data.sectionIndex]['column' + data.columnIndex];
    moveItemInArray(column, data.event.previousIndex, data.event.currentIndex);
    this.updateLocalStorage();
  }

  getOrCreateSections(id: any) {
    this.sections = [];
    this.expirementId = id;
    let sections = localStorage.getItem('expirement' + '--' + id);
    if (sections) {
      this.sections = JSON.parse(sections);
    } else {
      localStorage.setItem(
        'expirement' + '--' + id,
        JSON.stringify(this.sections)
      );
    }
  }

  updateLocalStorage() {
    localStorage.setItem(
      'expirement' + '--' + this.expirementId,
      JSON.stringify(this.sections)
    );
  }

  deleteSection(i: number) {
    this.sections.splice(i, 1);
    this.changeIndexOfSelection();
    this.updateLocalStorage();
  }
  deleteItemFromFormColumnFrom(data: any) {
    let column =
      this.sections[data.sectionIndex]['columnFrom' + data.columnIndex];
    column.splice(data.pushedIndex, 1);
    this.updateLocalStorage();
  }

  changeIndexOfSelection() {
    this.sections.forEach((item, indx) => {
      item.index = indx;
    });
  }

  newSection(values: any) {
    return {
      index: this.sections.length,
      title: values.title,

      config: {
        numberOfColumns: values.numberOfColumns,
        help: values.help,
        answeringTime: values.answeringTime,
        showCountdown: values.showCountdown,
      },

      vrl: {
        active: values.active,
        layout: values.layout,
        showScreenShotButton: values.showScreenShotButton,
        resources:values.resources
      },

      column1: [],
      column2: [],
      column3: [],
      columnFrom1: [],
      columnFrom2: [],
      columnFrom3: [],
    };
  }
  newTextContent() {
    return {
      index: -1,
      mainType: this.contentType,
      type: this.textType,
      config: {
        help: '',
        answeringTime: null,
        showCountdown: false,
      },
      content: {
        data: {},
      },
    };
  }
  newCodeContent() {
    return {
      index: -1,
      mainType: this.contentType,
      type: this.codeType,
      config: {
        help: '',
        answeringTime: null,
        showCountdown: false,
      },
      content: {
        data: {},
      },
    };
  }
  newIamgeContent() {
    return {
      index: -1,
      mainType: this.contentType,
      type: this.imageType,
      config: {
        help: '',
        answeringTime: null,
        showCountdown: false,
      },
      content: {
        data: {},
      },
    };
  }
  newVideoContent() {
    return {
      index: -1,
      mainType: this.contentType,
      type: this.videoType,
      config: {
        help: '',
        answeringTime: null,
        showCountdown: false,
      },
      content: {
        data: {},
      },
    };
  }
  newIframeContent() {
    return {
      index: -1,
      mainType: this.contentType,
      type: this.iframeType,
      config: {
        help: '',
        answeringTime: null,
        showCountdown: false,
      },
      content: {
        data: {},
      },
    };
  }
  newTrueOrFalse() {
    return {
      index: -1,
      mainType: this.questionType,
      type: this.trueOrFalseType,
      content: {
        data: [],
      },
      config: {
        help: '',
        answeringTime: null,
        showCountdown: false,
        grading: 'Manual',
        showCorrectAnswer: false,
      },
      score: {
        statements: [],
      },
    };
  }
  newOpenQuestion() {
    return {
      index: -1,
      mainType: this.questionType,
      type: this.openQuestionType,
      content: {
        data: [],
      },
      config: {
        help: '',
        answeringTime: null,
        showCountdown: false,
        grading: 'Manual',
        showCorrectAnswer: false,
      },
      score: {
        answer: null,
        score: null,
      },
    };
  }
  newSingeMcqQuestion() {
    return {
      index: -1,
      mainType: this.questionType,
      type: this.singleMcqType,
      content: {
        data: [],
      },
      config: {
        help: '',
        answeringTime: null,
        showCountdown: false,
        grading: 'Manual',
        showCorrectAnswer: false,
      },
      score: {
        choices: [],
      },
    };
  }
  newMultieMcqQuestion() {
    return {
      index: -1,
      mainType: this.questionType,
      type: this.multiMcqType,
      content: {
        data: [],
      },
      config: {
        help: '',
        answeringTime: null,
        showCountdown: false,
        grading: 'Manual',
        showCorrectAnswer: false,
      },
      score: {
        choices: [],
      },
    };
  }
  addDataToFormColum(data: any) {
    let column =
      this.sections[data.sectionIndex]['columnFrom' + data.columnIndex];
    column[data.pushedIndex].data = data.content;
    this.updateLocalStorage();
  }
  getFormColum(data: any) {
    try {
      let column =
        this.sections[data.sectionIndex]['columnFrom' + data.columnIndex];
      return column[data.pushedIndex].data;
    } catch {
      return null;
    }
  }

  private handleDataForSection(section: any) {
    section.config.showCountdown = section.config.showCountdown ? true : false;
    section.vrl.active = section.vrl.active ? true : false;
    section.vrl.showScreenShotButton = section.vrl.showScreenShotButton
      ? true
      : false;
  }
  private handleConfigForColumn(config: any) {
    // config.answeringTime = config.answeringTime ? true : false
    config.showCountdown = config.showCountdown ? true : false;
    if ('showCorrectAnswer' in config)
      config.showCorrectAnswer = config.showCorrectAnswer ? true : false;
  }
  getPreparedExam() {
    let toCreate: any[] = JSON.parse(JSON.stringify(this.sections));
    toCreate.forEach((section: any, sectionIndex: number) => {
      this.handleDataForSection(section);
      for (let i = 1; i <= 3; i++) {
        delete section['columnFrom' + i];

        section['column' + i].forEach((column: any, columnIndex: number) => {
          column.index = columnIndex;
          this.handleConfigForColumn(column.config);
          if (column.type == this.trueOrFalseType) {
            column.content.data.forEach(
              (question: any, questionIndex: number) => {
                column.score.statements.push({
                  statementId: questionIndex,
                  score: question.score,
                  answer: question.answer == 'false' ? false : true,
                });
              }
            );
          } else if (column.type == this.openQuestionType) {
            column.score = {
              answer: column.content.data.answer,
              score: column.content.data.score,
            };
          } else if (column.type == this.singleMcqType) {
            column.content.data.choices.forEach(
              (item: any, choiceIdex: number) => {
                if (item.score > 0) {
                  column.score.choices.push({
                    choiceId: choiceIdex,
                    score: item.score,
                  });
                }
              }
            );
          } else if (column.type == this.multiMcqType) {
            column.content.data.choices.forEach(
              (item: any, choiceIdex: number) => {
                column.score.choices.push({
                  choiceId: choiceIdex,
                  score: item.score,
                });
              }
            );
          }
          column.content.data = JSON.stringify(column.content.data);
        });
      }
    });
    return toCreate;
  }

  requestSended() {
    localStorage.removeItem('expirement' + '--' + this.expirementId);
  }
}

// MEDIA,
// DOCUMENT,
// EQUATION
