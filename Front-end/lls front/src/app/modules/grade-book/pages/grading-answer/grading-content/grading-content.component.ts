import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GradeBookService } from '../../../services/grade-book.service';

@Component({
  selector: 'app-grading-content',
  templateUrl: './grading-content.component.html',
  styleUrls: ['./grading-content.component.scss']
})
export class GradingContentComponent implements OnInit {

  @Input('sectionIndex') sectionIndex: any;
  @Input('columnIndex') columnIndex: any;
  @Input('pushedIndex') pushedIndex: any;
  @Input('data') data: any;
  contentType: any = '';
  display: any = false;
  loading = false;
  enableUpload = true;

  constructor(public gradingService:GradeBookService, private sanitized: DomSanitizer) { }

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
