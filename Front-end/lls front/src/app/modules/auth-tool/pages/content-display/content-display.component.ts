import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthToolService } from '../../services/auth-tool.service';

@Component({
  selector: 'app-content-display',
  templateUrl: './content-display.component.html',
  styleUrls: ['./content-display.component.scss'],
})
export class ContentDisplayComponent implements OnInit {
  @Input('sectionIndex') sectionIndex: any;
  @Input('columnIndex') columnIndex: any;
  @Input('pushedIndex') pushedIndex: any;
  @Input('data') data: any;
  contentType: any = '';
  display: any = false;
  loading = false;
  enableUpload = true;
  codeForm: any = new FormGroup({
    lang: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required],
    }),
    code: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required],
    }),
  });
  html: string = '';
  htmlEdit: any = '';
  iframeForm: any = new FormGroup({
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
  imageHelp: string = '';
  constructor(
    public authToolService: AuthToolService,
    private http: HttpService,
    private sanitized: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.contentType = this.data.type;
    if (this.contentType == this.authToolService.textType) {
      this.html = this.data.content.data.html;
    }
    if (this.contentType == this.authToolService.codeType) {
      this.codeForm.setValue(this.data.content.data);
    }
    if (this.contentType == this.authToolService.iframeType) {
      this.iframeForm.setValue(this.data.content.data);
    }
    if (this.contentType == this.authToolService.imageType) {
      this.imageHelp = this.data.content.data.help;
    }
  }
  parseHtml(): any {
    return this.sanitized.bypassSecurityTrustHtml(this.html);
  }
  iframeURl(): SafeUrl {
    return this.sanitized.bypassSecurityTrustResourceUrl(
      this.data.content.data.iFrame
    );
  }
  updateForm() {
    if (this.contentType == this.authToolService.textType) {
      this.html = this.htmlEdit;
      this.authToolService.updateSelectionColumn({
        sectionIndex: this.sectionIndex,
        columnIndex: this.columnIndex,
        pushedIndex: this.pushedIndex,
        content: { html: this.html },
      });
      this.htmlEdit = '';
    } else if (this.contentType == this.authToolService.iframeType) {
      if (this.iframeForm.invalid) return;
      this.authToolService.updateSelectionColumn({
        sectionIndex: this.sectionIndex,
        columnIndex: this.columnIndex,
        pushedIndex: this.pushedIndex,
        content: { ...this.iframeForm.value },
      });
    } else {
      if (this.codeForm.invalid) return;
      this.authToolService.updateSelectionColumn({
        sectionIndex: this.sectionIndex,
        columnIndex: this.columnIndex,
        pushedIndex: this.pushedIndex,
        content: { ...this.codeForm.value },
      });
    }
    this.display = false;
  }
  deleteItem() {
    this.authToolService.deleteSelectionColumn({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
    });
  }
  editForm() {
    if (this.contentType == this.authToolService.textType) {
      setTimeout(() => {
        this.htmlEdit = this.html;
      }, 40);
    }

    this.display = true;

    this.enableUpload = true;
  }
  uploadFile(event: any) {
    let url: string = '/api/File/File';
    if (this.contentType == this.authToolService.imageType)
      url = '/api/File/Image';
    let formdata = new FormData();
    formdata.append('imageUpload', event.files[0]);
    this.http.postRequest(url, formdata).subscribe({
      next: (res: any) => {
        let content: any = { url: res.url };
        if (this.contentType == this.authToolService.imageType)
          content['help'] = this.imageHelp;
        this.authToolService.updateSelectionColumn({
          sectionIndex: this.sectionIndex,
          columnIndex: this.columnIndex,
          pushedIndex: this.pushedIndex,
          content,
        });
        this.data.content.data.url = '';
        setTimeout(() => {
          this.data.content.data.url = res.url;
        }, 60);
        event.files = [];
        this.loading = false;
        this.display = false;
        this.enableUpload = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
  closePopup() {
    if (this.contentType == this.authToolService.textType) this.htmlEdit = '';
  }
  saveImageHelp() {
    this.authToolService.updateSelectionColumn({
      sectionIndex: this.sectionIndex,
      columnIndex: this.columnIndex,
      pushedIndex: this.pushedIndex,
      content: { ...this.data.content.data, help: this.imageHelp },
    });
    this.display = false;
  }
}
