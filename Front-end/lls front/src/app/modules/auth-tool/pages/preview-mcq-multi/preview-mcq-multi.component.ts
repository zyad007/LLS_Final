import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-mcq-multi',
  templateUrl: './preview-mcq-multi.component.html',
  styleUrls: ['./preview-mcq-multi.component.scss']
})
export class PreviewMcqMultiComponent implements OnInit {
  @Input('data') data: any;
  chooices:any[]=[] 
  constructor() { }

  ngOnInit(): void {
  }

}
