import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthToolService } from '../../services/auth-tool.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  @Input('contentType') contentType: any;
  @Input('sectionIndex') sectionIndex: any;
  @Input('columnIndex') columnIndex: any;
  @Input('pushedIndex') pushedIndex: any;
  html: any;
  imageHelp: any;
  loading = false;
  codeForm = new FormGroup({
    lang: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required],
    }),
    code: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required],
    }),
  });
  iframeForm = new FormGroup({
    iFrame: new FormControl(null, {
      updateOn: 'change',
      validators: [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/
        ),
      ],
    }),
  });
  constructor(
    public authToolService: AuthToolService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    if (this.contentType == this.authToolService.textType) {
      let data: any = this.authToolService.getFormColum({
        sectionIndex: this.sectionIndex,
        columnIndex: this.columnIndex,
        pushedIndex: this.pushedIndex,
      });
      if (!data) data = {};
      if (Object.keys(data).length) {
        this.html = data.html;
      }
    }
    if (this.contentType == this.authToolService.codeType) {
      let data: any = this.authToolService.getFormColum({
        sectionIndex: this.sectionIndex,
        columnIndex: this.columnIndex,
        pushedIndex: this.pushedIndex,
      });
      if (!data) data = {};
      if (Object.keys(data).length) {
        this.codeForm.setValue(data);
      }
    }
    if (this.contentType == this.authToolService.iframeType) {
      let data: any = this.authToolService.getFormColum({
        sectionIndex: this.sectionIndex,
        columnIndex: this.columnIndex,
        pushedIndex: this.pushedIndex,
      });
      if (!data) data = {};
      if (Object.keys(data).length) {
        this.iframeForm.setValue(data);
      }
    }
  }
  uploadFile(event: any) {
    if (this.contentType == this.authToolService.imageType) {
      let formdata = new FormData();
      formdata.append('imageUpload', event.files[0]);
      this.http.postRequest('/api/File/Image', formdata).subscribe({
        next: (res: any) => {
          let content: any = this.authToolService.newIamgeContent();
          content.content.data = { url: res.url };
          this.authToolService.createSelectionColumn({
            sectionIndex: this.sectionIndex,
            columnIndex: this.columnIndex,
            pushedIndex: this.pushedIndex,
            content,
          });

          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
    }
    if (this.contentType == this.authToolService.videoType) {
      let formdata = new FormData();
      formdata.append('imageUpload', event.files[0]);
      this.http.postRequest('/api/File/File', formdata).subscribe({
        next: (res: any) => {
          let content: any = this.authToolService.newVideoContent();
          content.content.data = { url: res.url };
          this.authToolService.createSelectionColumn({
            sectionIndex: this.sectionIndex,
            columnIndex: this.columnIndex,
            pushedIndex: this.pushedIndex,
            content,
          });

          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
    }
  }
  createForm() {
    if (this.contentType == this.authToolService.codeType) {
      if (this.codeForm.invalid) {
        this.codeForm.markAllAsTouched();
        return;
      }
      let content: any = this.authToolService.newCodeContent();
      content.content.data = this.codeForm.value;
      this.authToolService.createSelectionColumn({
        sectionIndex: this.sectionIndex,
        columnIndex: this.columnIndex,
        pushedIndex: this.pushedIndex,
        content,
      });
    } else if (this.contentType == this.authToolService.iframeType) {
      if (this.iframeForm.invalid) {
        this.iframeForm.markAllAsTouched();
        return;
      }
      let content: any = this.authToolService.newIframeContent();
      content.content.data = this.iframeForm.value;
      this.authToolService.createSelectionColumn({
        sectionIndex: this.sectionIndex,
        columnIndex: this.columnIndex,
        pushedIndex: this.pushedIndex,
        content,
      });
    } else {
      let content: any = this.authToolService.newTextContent();
      content.content.data = { html: this.html };
      this.authToolService.createSelectionColumn({
        sectionIndex: this.sectionIndex,
        columnIndex: this.columnIndex,
        pushedIndex: this.pushedIndex,
        content,
      });
    }
  }
  deleteItem() {
    this.authToolService.deleteItemFromFormColumnFrom({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
    });
  }
  updateData() {
    if (this.contentType == this.authToolService.codeType)
      this.authToolService.addDataToFormColum({
        sectionIndex: this.sectionIndex,
        columnIndex: this.columnIndex,
        pushedIndex: this.pushedIndex,
        content: { ...this.codeForm.value },
      });
    else if (this.contentType == this.authToolService.iframeType) {
      this.authToolService.addDataToFormColum({
        sectionIndex: this.sectionIndex,
        columnIndex: this.columnIndex,
        pushedIndex: this.pushedIndex,
        content: { ...this.iframeForm.value },
      });
    } else if (this.contentType == this.authToolService.imageType) {
      this.authToolService.addDataToFormColum({
        sectionIndex: this.sectionIndex,
        columnIndex: this.columnIndex,
        pushedIndex: this.pushedIndex,
        content: { url: '', help: this.imageHelp },
      });
    }
  }

  getTextData() {
    this.authToolService.addDataToFormColum({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      content: { html: this.html },
    });
  }
}
