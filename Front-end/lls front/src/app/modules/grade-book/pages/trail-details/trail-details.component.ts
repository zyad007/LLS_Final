import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { GradeBookService } from '../../services/grade-book.service';

@Component({
  selector: 'app-trail-details',
  templateUrl: './trail-details.component.html',
  styleUrls: ['./trail-details.component.scss'],
})
export class TrailDetailsComponent implements OnInit {
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
  overallFeedback!: string;
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    public gradingService: GradeBookService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params['idd'];
      this.experimentId = params['expIdd'];
      this.gradeid = params['gradeBookId'];
      this.trailId = params['trialIdd'];
      this.getExpirement();
    });
  }
  getExpirement() {
    this.http
      .get(
        `/api/Course/${this.courseId}/Experiment/${this.experimentId}/Grade-Book/${this.gradeid}/Trial/${this.trailId}/`
      )
      .subscribe((res) => {
        console.log(res);

        this.gradingService.setSections(
          res.data.llo.sections,
          res.data.lro.sections,
          this.courseId,
          this.experimentId,
          this.gradeid,
          this.trailId
        );
        // this.trialsDetails = res;
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
  openDialog() {
    this.emptyScore = this.gradingService.checkEmptyScores();
    if (!this.emptyScore) this.display = true;
  }
  sendAnswers() {
    if (!this.overallFeedback) return;
    this.http
      .post(
        `/api/Course/${this.courseId}/Experiment/${this.experimentId}/Grade-Book/${this.gradeid}/Trial/${this.trailId}`,
        {
          sections: this.gradingService.answers,
          feedBack: this.overallFeedback,
        }
      )
      .subscribe((res) => {
        console.log(res);
        this.display = false;
        this.success = true;
      });
  }
  finishAnswer() {
    // trial/:idd/:expIdd/:gradeBookId
    // this.router.navigate(['/user','grade-book','trial',this.courseId,this.experimentId,this.gradeid]);
    this.router.navigate(['/user', 'grade-book']);
  }
}
