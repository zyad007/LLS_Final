import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { StudentService } from '../../services/student.service';
// 119b108d-f825-46de-b633-d10fa9718c3c
// courseIdd: 89628c23-e196-48c1-8726-da9d2a5fb1cb
//expIdd: feced2d5-23b4-4930-9564-d9f77e2aece6
@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss'],
})
export class ExperimentComponent implements OnInit {
  loading = false;
  numberOfColumns: any[] = [1, 2, 3];
  layout: any[] = ['Vertical', 'Horizontal'];
  currentSectionNumber = 0;
  display = false;
  hash = '----curentpage';
  url: any = '';
  courseId: any = null;
  expirementId: any = null;
  success = false;
  trilId: any = null;

  constructor(
    private http: HttpService,
    public studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.route.params.subscribe((params: any) => {
      this.courseId = params.courseid;
      this.expirementId = params.id;
      this.getExpirement(params.id);

      this.initPageNumber();
      this.http
        .postRe(`/api/Student/Start-Trial/?idd=${this.expirementId}`, {})
        .subscribe((res) => {
          this.trilId = res.data.trialId;
        });
    });
  }
  ngOnInit(): void {}
  setUrl(id: any) {
    let resource: any = '';
    for (let i = 0; i < this.studentService.sections.length; i++) {
      let section: any = this.studentService.sections[i];
      if (section.vrl.active && section.vrl.resources) {
        resource = section.vrl.resources;
        break;
      }
    }
    // this.url = this.sanitize('https://www.youtube.com/embed/tgbNymZ7vqY');
    let url: any = `/api/Vrl?expIdd=${id}`;
    if (resource) url += `&resource=${resource}`;
    this.http.getRequest(url).subscribe((response: any) => {
      if (response.url) this.url = this.sanitize(response.url);
    });
  }
  getExpirement(id: string) {
    this.loading = true;
    this.http.getRequest(`/api/Experiment/${id}/LLO/`).subscribe((res: any) => {
      this.loading = false;
      this.studentService.setSections(res.data.sections, id);
      this.setUrl(id);
    });
  }
  initPageNumber() {
    let data = localStorage.getItem(btoa(this.expirementId + this.hash));
    if (data) {
      try {
        this.currentSectionNumber = parseInt(atob(data).split(this.hash)[0]);
      } catch {
        this.currentSectionNumber = 0;
      }
    }
  }
  handlePages() {
    localStorage.setItem(
      btoa(this.expirementId + this.hash),
      btoa(this.currentSectionNumber + this.hash)
    );
    let data: any = localStorage.getItem(btoa(this.expirementId + this.hash));
    try {
      this.currentSectionNumber = parseInt(atob(data).split(this.hash)[0]);
    } catch {
      this.currentSectionNumber = 0;
    }
  }

  getNumberOfColumns(columns: number) {
    let arr: any[] = [];
    for (let i = 1; i <= columns; i++) arr.push(i);
    return arr;
  }
  nextSection() {
    if (this.currentSectionNumber >= this.studentService.sections.length - 1)
      return;
    this.currentSectionNumber += 1;
    this.handlePages();
  }
  previousSection() {
    if (this.currentSectionNumber <= 0) return;
    this.currentSectionNumber -= 1;
    this.handlePages();
  }
  openDialog() {
    this.display = true;
  }
  sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  sendAnswers() {
    this.display = false;
    this.loading = true;
    let data: any = {
      lla: { sections: this.studentService.answers },
      expIdd: this.expirementId,
      courseIdd: this.courseId,
      trilId: this.trilId,
    };
    this.http
      .postRe('/api/Student/Submit-Trial', data)
      .subscribe((res: any) => {
        this.loading;
        localStorage.removeItem(btoa(this.expirementId + this.hash));
        this.studentService.delteLocalStorage();
        this.success = true;
        this.finishAnswer();
      });
  }
  finishAnswer() {
    this.router.navigate(['/user', 'completed-experiment']);
  }
}
