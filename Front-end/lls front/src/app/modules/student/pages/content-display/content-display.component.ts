import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpService } from 'src/app/core/services/http.service';
import { StudentService } from '../../services/student.service';


@Component({
  selector: 'app-content-display',
  templateUrl: './content-display.component.html',
  styleUrls: ['./content-display.component.scss']
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
  textForm = new FormGroup({
    text: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required],
    }),
  });
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
  constructor(public studentService: StudentService, private sanitized: DomSanitizer) { }

  ngOnInit(): void {
    this.contentType = this.data.type;
  }
  parseHtml():any{
    return this.sanitized.bypassSecurityTrustHtml(this.data.content.data.html);
  }
  iframeURl():SafeUrl{
    return this.sanitized.bypassSecurityTrustResourceUrl(this.data.content.data.iFrame)
  }

}




