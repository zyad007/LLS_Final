import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { AnalyticeCourse } from '../../models/analytics-course';
import { AnalyticsCourseActions } from '../../store/analytics-courses/action/analytics-course-type';
import {
  selectAnalyticsCourseCurrentPage,
  selectAnalyticsCourseList,
  selectAnalyticsCourseNumberOfPages,
} from '../../store/analytics-courses/selector/analytics-course.selectors';

@Component({
  selector: 'app-analyticss-course',
  templateUrl: './analyticss-course.component.html',
  styleUrls: ['./analyticss-course.component.scss'],
})
export class AnalyticsCourseComponent implements OnInit {
  // AnalyticsCourseList$!: Observable<AnalyticeCourse[] | null>;
  AnalyticsCourseList$!: AnalyticeCourse[];
  AnalyticsCoursePageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  editAnalyticForm: boolean = false;
  id!: string;
  next!: any;
  pervious!: any;
  constructor(
    private store: Store,
    public authServices: AuthService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(AnalyticsCourseActions.loadAnalyticsCourse());
    // this.AnalyticsCourseList$ = this.store.select(selectAnalyticsCourseList);
    // this.AnalyticsCoursePageNumber$ = this.store.select(
    //   selectAnalyticsCourseNumberOfPages
    // );
    // this.currentPageNumber$ = this.store.select(
    //   selectAnalyticsCourseCurrentPage
    // );
    this.http.get('/api/Analytics/Course').subscribe({
      next: (res) => {
        console.log(res);
        this.AnalyticsCourseList$ = res.data.result;
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
    this.http
      .get(
        `/api/Analytics/Course/?searchByCourseCode=${searchText}`
      )
      .subscribe({
        next: (res) => {
          this.AnalyticsCourseList$ = res.data.result;
          if (res.data?.next) {
            this.next = res.data?.next;
          }
        },
        error: (any) => {},
      });
  }
  searchByCourseName(searchText: string) {
    this.http
      .get(`/api/Analytics/Course/?searchByCourseName=${searchText}`)
      .subscribe({
        next: (res) => {
          this.AnalyticsCourseList$ = res.data.result;
        },
        error: (any) => {},
      });
  } 
  
  paginate() {
    if (this.next) {
      this.http.getNext(this.next).subscribe({
        next: (res) => {
          this.AnalyticsCourseList$ = res.data.result;
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
          this.AnalyticsCourseList$ = res.data.result;
          this.next = res.data.next;
          this.pervious = res.data.pervious;
        },
        error: (any) => {},
      });
    }
  }
  // paginate(page: number, pages: number[]) {
  //   if (page < 1 || page > pages.length) return;
  //   this.store.dispatch(
  //     AnalyticsCourseActions.loadAnalyticsCourseNext({
  //       pagination: page,
  //     })
  //   );
  // }
  exportCourse() {
    this.http.get(`/api/Analytics/Course/Report`).subscribe(
      (res) => {
        window.open(res.url, '_target');
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
