import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { CompletedExperimentService } from '../../services/completed-experiment.service';

@Component({
  selector: 'app-completed-details',
  templateUrl: './completed-details.component.html',
  styleUrls: ['./completed-details.component.scss'],
})
// /api/Student/Completed/{idd}
export class CompletedDetailsComponent implements OnInit {
  // @Input('item') item!: CompletedExperiment;
  // data!: any;
  // id: any;
  // weekDays: any[] = [];
  // time: any[] = [];
  // curentDay: any;
  // constructor(
  //   public authServices: AuthService,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private http: HttpService
  // ) {}

  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.id = params['idd'];
  //     this.http.getRequest(`/api/Student/Completed/${this.id}`).subscribe({
  //       next: (res: any) => {
  //         this.data = res.data;
  //       },
  //       error: (error: any) => {},
  //     });
  //   });
  // }
  courseId: any;
  experimentId: any;
  gradeid: any;
  // trialsDetails!: Trial[];
  numberOfColumns: any[] = [1, 2, 3];
  layout: any[] = ['Vertical', 'Horizontal'];
  trailId: any;
  currentSectionNumber: number = 0;
  display: boolean = false;
  success: boolean = false;
  emptyScore: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    public gradingService: CompletedExperimentService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.experimentId = params['idd'];
      this.getExpirement();
    });
  }
  getExpirement() {
    this.http
      .get(`/api/Student/Completed/${this.experimentId}`)
      .subscribe((res) => {
        this.gradingService.setSections(
          res.data.llo.sections,
          res.data.lro.sections,
          this.experimentId
        );
      });
  }
  getNumberOfColumns(columns: number) {
    let arr: any[] = [];
    for (let i = 1; i <= columns; i++) arr.push(i);
    return arr;
  }
  nextSection() {
    if (this.currentSectionNumber >= this.gradingService.sections.length - 1)
      return;
    this.currentSectionNumber += 1;
  }
  previousSection() {
    if (this.currentSectionNumber <= 0) return;
    this.currentSectionNumber -= 1;
  }
  sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
