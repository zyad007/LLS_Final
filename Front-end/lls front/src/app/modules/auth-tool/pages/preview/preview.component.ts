import { Component, Input, OnInit } from '@angular/core';
import { AuthToolService } from '../../services/auth-tool.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  currentSectionNumber = 0;
  @Input('sections') sections!: any;
  layout: any[] = ['Vertical', 'Horizontal'];

  constructor(public authToolService: AuthToolService) {}
  ngOnInit(): void {
  }
  nextSection() {
    if (this.currentSectionNumber >= this.sections.length - 1) return;
    this.currentSectionNumber += 1;
  }
  previousSection() {
    if (this.currentSectionNumber <= 0) return;
    this.currentSectionNumber -= 1;
  }
  getNumberOfColumns(columns: number) {
    let arr: any[] = [];
    for (let i = 1; i <= columns; i++) arr.push(i);
    return arr;
  }
}
