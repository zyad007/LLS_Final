import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { CompletedExperiment } from '../../models/completed-experiment';
import { CompletedExperimentActions } from '../../store/action/completed-experiment-type';
import {
  selectCompletedExperimentCurrentPage,
  selectCompletedExperimentList,
  selectCompletedExperimentNumberOfPages,
} from '../../store/selector/completed-experiment.selectors';

@Component({
  selector: 'app-completed-experiment',
  templateUrl: './completed-experiment.component.html',
  styleUrls: ['./completed-experiment.component.scss'],
})
export class CompletedExperimentComponent implements OnInit {
  CompletedExperimentList$!: CompletedExperiment[];
  CompletedExperimentPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  id!: string;
  item!: CompletedExperiment;
  next!: any;
  pervious!: any;
  constructor(
    private store: Store,
    private router: Router,
    public authServices: AuthService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(CompletedExperimentActions.loadCompletedExperiments());
    // this.CompletedExperimentList$ = this.store.select(
    //   selectCompletedExperimentList
    // );
    // this.CompletedExperimentPageNumber$ = this.store.select(
    //   selectCompletedExperimentNumberOfPages
    // );
    // this.currentPageNumber$ = this.store.select(
    //   selectCompletedExperimentCurrentPage
    // );

    this.http.get('/api/Student/Completed').subscribe({
      next: (res) => {
        console.log(res);
        this.CompletedExperimentList$ = res.data.result;
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
      .get(`/api/Student/Assigned/?searchByExperimentName=${searchText}`)
      .subscribe({
        next: (res) => {
          this.CompletedExperimentList$ = res.data.result;
          if (res.data?.next) {
            this.next = res.data?.next;
          }
        },
        error: (any) => {},
      });
  }
  searchByCourseName(searchText: string) {
    this.http
      .get(`/api/Student/Assigned/?searchByCourseName=${searchText}`)
      .subscribe({
        next: (res) => {
          this.CompletedExperimentList$ = res.data.result;
        },
        error: (any) => {},
      });
  }

  paginate() {
    if (this.next) {
      this.http.getNext(this.next).subscribe({
        next: (res) => {
          this.CompletedExperimentList$ = res.data.result;
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
          this.CompletedExperimentList$ = res.data.result;
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
  //     CompletedExperimentActions.loadCompletedExperimentNext({
  //       pagination: page,
  //     })
  //   );
  // }
}
