import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthToolService } from '../../services/auth-tool.service';

@Component({
  selector: 'app-preview-content',
  templateUrl: './preview-content.component.html',
  styleUrls: ['./preview-content.component.scss']
})
export class PreviewContentComponent implements OnInit {
  @Input('data') data: any;
  constructor(public authToolService: AuthToolService, private sanitized: DomSanitizer) { }
  contentType!:any ;
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
