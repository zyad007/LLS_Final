import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-true-false',
  templateUrl: './preview-true-false.component.html',
  styleUrls: ['./preview-true-false.component.scss']
})
export class PreviewTrueFalseComponent implements OnInit {
  @Input('data') data: any;
  chooices:any[] =[];
  constructor() { }

  ngOnInit(): void {
    this.chooices =this.data.content.data.map(()=>null) 
  }

}
