import { Component, Input, OnInit } from '@angular/core';
import { AuthToolService } from '../../services/auth-tool.service';
@Component({
  selector: 'app-preview-mcq-single',
  templateUrl: './preview-mcq-single.component.html',
  styleUrls: ['./preview-mcq-single.component.scss']
})
export class PreviewMcqSingleComponent implements OnInit {
  @Input('data') data: any;
  chooice =null
  constructor() { }

  ngOnInit(): void {
  }

}
