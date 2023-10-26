import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClipboardService } from 'ngx-clipboard';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';
import { environment } from 'src/environments/environment';
import { Experiment } from '../../models/show-experiment';
import { ShowExperimentService } from '../../services/show-experiment.service';
import { ExperimentsActions } from '../../store/experiment/action/show-experiment-type';
import {
  selectExperimentsShCurrentPage,
  selectExperimentsShList,
  selectExperimentsShNumberOfPages,
} from '../../store/experiment/selector/show-experiment.selectors';

@Component({
  selector: 'app-show-experiment',
  templateUrl: './show-experiment.component.html',
  styleUrls: ['./show-experiment.component.scss'],
  providers: [MessageService],
})
export class ShowExperimentComponent implements OnInit {
  // ExperimentsList$!: Observable<Experiment[] | null>;
  ExperimentsList$!: Experiment[];
  ExperimentsPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  id!: string;
  next!: any;
  pervious: any;
  constructor(
    private store: Store,
    private clipboardService: ClipboardService,
    private messageService: MessageService,
    private http: HttpService,
    public exService: ShowExperimentService,
    public authServices: AuthService,
    public courseServices: CoursesService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(ExperimentsActions.loadShExperiments());
    // this.ExperimentsList$ = this.store.select(selectExperimentsShList);
    // this.ExperimentsPageNumber$ = this.store.select(
    //   selectExperimentsShNumberOfPages
    // );
    // this.currentPageNumber$ = this.store.select(selectExperimentsShCurrentPage);
    this.http.get('/api/Experiment').subscribe({
      next: (res) => {
        console.log(res);
        this.ExperimentsList$ = res.data.result;
        if (res.data?.next) {
          this.next = res.data?.next;
          console.log(this.next);
        }
        if (res.data?.pervious) {
          this.pervious = res.data?.pervious;
        }
      },
      error: (any) => {},
    });
  }
  searchByName(searchText: string) {
    this.http.get(`/api/Experiment/?searchByName=${searchText}`).subscribe({
      next: (res) => {
        this.ExperimentsList$ = res.data.result;
        if (res.data?.next) {
          this.next = res.data?.next;
        }
      },
      error: (any) => {},
    });
  }
  searchByCourseName(searchText: string) {
    this.http
      .get(`/api/Course/?searchByRelatedCourse=${searchText}`)
      .subscribe({
        next: (res) => {
          this.ExperimentsList$ = res.data.result;
        },
        error: (any) => {},
      });
  }

  paginate() {
    if (this.next) {
      this.http.getNext(this.next).subscribe({
        next: (res) => {
          this.ExperimentsList$ = res.data.result;
          this.next = res.data.next;
          this.pervious = res.data.previous;
        },
        error: (any) => {},
      });
    }
  }
  // paginate(page: number, pages: number[]) {
  //   if (page < 1 || page > pages.length) return;
  //   this.store.dispatch(
  //     ExperimentsActions.loadShExperimentsNext({
  //       pagination: page,
  //     })
  //   );
  // }
  perviousP() {
    if (this.pervious) {
      this.http.get(this.pervious).subscribe({
        next: (res) => {
          this.ExperimentsList$ = res.data.result;
          this.next = res.data.next;
          this.pervious = res.data.pervious;
        },
        error: (any) => {},
      });
    }
  }
  openEditExperiment(exId: string) {
    this.courseServices.editExperimentForm = true;
    this.id = exId;
  }
  copyLink(id: string) {
    this.clipboardService.copyFromContent(
      'https://charming-jones.74-50-88-98.plesk.page' +
        '/user/show-ex/sh-details/' +
        id
    );
    this.showInfo('Experiment copied successfully', 'success');
  }
  showInfo(messageEn: string, type: any) {
    let message = messageEn;
    this.messageService.add({
      severity: type,
      summary: type,
      detail: message,
      key: 'check',
    });
  }
  importExperiment() {
    this.exService.importDisplay = true;
  }
  exportExperiment(id: string) {
    this.http.get(`/api/Experiment/${id}/Export`).subscribe(
      (res) => {
        this.download(id + '.txt', JSON.stringify(res));
      },
      (error) => {}
    );
  }
  download(filename: any, text: any) {
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
