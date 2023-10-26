import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Analytice } from '../../models/analytics';
import { AnalyticsPageActions } from '../../store/analytics/action/analytics-type';
import {
  selectAnalyticsCurrentPage,
  selectAnalyticsList,
  selectAnalyticsNumberOfPages,
} from '../../store/analytics/selector/analytics.selectors';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  // AnalyticsList$!: Observable<Analytice[] | null>;
  AnalyticsList$!: Analytice[];
  AnalyticsPageNumber$!: Observable<number[]>;
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
    // this.store.dispatch(AnalyticsPageActions.loadAnalyticsPage());
    // this.AnalyticsList$ = this.store.select(selectAnalyticsList);
    // this.AnalyticsPageNumber$ = this.store.select(selectAnalyticsNumberOfPages);
    // this.currentPageNumber$ = this.store.select(selectAnalyticsCurrentPage);
    this.http.get('/api/Analytics/Experiment').subscribe({
      next: (res) => {
        console.log(res);
        this.AnalyticsList$ = res.data.result;
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
      .get(`/api/Analytics/Experiment/?searchByExperimentName=${searchText}`)
      .subscribe({
        next: (res) => {
          this.AnalyticsList$ = res.data.result;
          if (res.data?.next) {
            this.next = res.data?.next;
          }
        },
        error: (any) => {},
      });
  }
  searchByCourseName(searchText: string) {
    this.http
      .get(`/api/Analytics/Experiment/?searchByRelatedCourse=${searchText}`)
      .subscribe({
        next: (res) => {
          this.AnalyticsList$ = res.data.result;
        },
        error: (any) => {},
      });
  }
  paginate() {
    if (this.next) {
      this.http.getNext(this.next).subscribe({
        next: (res) => {
          this.AnalyticsList$ = res.data.result;
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
          this.AnalyticsList$ = res.data.result;
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
  //     AnalyticsPageActions.loadAnalyticsNext({
  //       pagination: page,
  //     })
  //   );
  // }
  exportExperiment(id: string) {
    this.http.get(`/api/Analytics/Experiment/?expIdd=${id}/Report`).subscribe(
      (res) => {
        if(res.url) {
          window.open(res.url, '_target');
        }
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
