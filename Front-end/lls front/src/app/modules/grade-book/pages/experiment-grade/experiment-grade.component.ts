import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';
import { GradingBook } from '../../models/grade-book';
import { GradingActions } from '../../store/grading/action/grade-book-type';
import {
  selectGradingCurrentPage,
  selectGradingList,
  selectGradingNumberOfPages,
} from '../../store/grading/selector/grade-book.selectors';

@Component({
  selector: 'app-experiment-grade',
  templateUrl: './experiment-grade.component.html',
  styleUrls: ['./experiment-grade.component.scss'],
})
export class ExperimentGradeComponent implements OnInit {
  itemId!: string;
  // Gradings$!: Observable<GradingBook[] | null>;
  Gradings$!: GradingBook[] ;
  GradingPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  courseId: any;
  experimentId: any;
  next: any;
  pervious: any;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public courseService: CoursesService,
    private http: HttpService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params['idd'];
      this.experimentId = params['expIdd'];
      // this.store.dispatch(
      //   GradingActions.loadGradingPage({
      //     idd: params['idd'],
      //     expIdd: params['expIdd'],
      //   })
      // );
      // this.Gradings$ = this.store.select(selectGradingList(params['idd']));
      // this.GradingPageNumber$ = this.store.select(
      //   selectGradingNumberOfPages(params['idd'])
      // );
      // this.currentPageNumber$ = this.store.select(
      //   selectGradingCurrentPage(params['idd'])
      // );
      // 
      this.http.get(`/api/Course/${this.courseId}/Experiment/${this.experimentId}/Grade-Book`).subscribe({
        next: (res) => {
          console.log(res);
          this.Gradings$ = res.data.result;
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
    });
  }
  searchByName(searchText: string) {
    this.http
      .get(`/api/Course/${this.courseId}/Experiment/${this.experimentId}/Grade-Book/?searchByEmail=${searchText}`)
      .subscribe({
        next: (res) => {
          this.Gradings$ = res.data.result;
          if (res.data?.next) {
            this.next = res.data?.next;
          }
        },
        error: (any) => {},
      });
  }
  paginate() {
    if (this.next) {
      this.http.getNext(this.next).subscribe({
        next: (res) => {
          this.Gradings$ = res.data.result;
          this.next = res.data.next;
          this.pervious = res.data.pervious;
        },
        error: (any) => {},
      });
    }
  } 
  perviousP() {
    if (this.pervious) {
      this.http.get(this.pervious).subscribe({
        next: (res) => {
          this.GradingPageNumber$ = res.data.result;
          this.next = res.data.next;
          this.pervious = res.data.pervious;
        },
        error: (any) => {},
      });
    }
  }
  exportReport(){
    this.http
    .get(
      `/api/Course/${this.courseId}/Experiment/${this.experimentId}/Grade-Book/Report`
    )
    .subscribe(
      (res) => {
        window.open(res.url, '_target');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // paginate(page: number, pages: number[]) {
  //   if (page < 1 || page > pages.length) return;
  //   this.store.dispatch(
  //     GradingActions.loadGradingNext({
  //       pagination: page,
  //       id: this.courseId,
  //       expIdd: this.experimentId,
  //     })
  //   );
  // }
  exportExperiment(id: string) {
    this.http
      .get(
        `/api/Course/${this.courseId}/Experiment/${this.experimentId}/Grade-Book/${id}/Report`
      )
      .subscribe(
        (res) => {
          window.open(res.url, '_target');
        },
        (error) => {
          console.log(error);
        }
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
