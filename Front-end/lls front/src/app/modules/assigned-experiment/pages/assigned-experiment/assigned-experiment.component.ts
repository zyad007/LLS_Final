import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { AssignedExperiment } from '../../models/assigned-experiment';
import { AssignedExperimentActions } from '../../store/assigned-ex/action/assigned-experiment-type';
import {
  selectAssignedExperimentCurrentPage,
  selectAssignedExperimentList,
  selectAssignedExperimentNumberOfPages,
} from '../../store/assigned-ex/selector/assigned-experiment.selectors';

@Component({
  selector: 'app-assigned-experiment',
  templateUrl: './assigned-experiment.component.html',
  styleUrls: ['./assigned-experiment.component.scss'],
})
export class AssignedExperimentComponent implements OnInit {
  // AssignedExperimentList$!: Observable<AssignedExperiment[] | null>;
  AssignedExperimentList$!: AssignedExperiment[];
  AssignedExperimentPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  id!: string;
  item!: AssignedExperiment;
  next!: any;
  pervious!:any;
  constructor(
    private store: Store,
    private router: Router,
    public authServices: AuthService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(AssignedExperimentActions.loadAssignedExperiments());
    // this.AssignedExperimentList$ = this.store.select(
    //   selectAssignedExperimentList
    // );
    // this.AssignedExperimentPageNumber$ = this.store.select(
    //   selectAssignedExperimentNumberOfPages
    // );
    // this.currentPageNumber$ = this.store.select(
    //   selectAssignedExperimentCurrentPage
    // );
    this.http.get('/api/Student/Assigned').subscribe({
      next: (res) => {
        this.AssignedExperimentList$ = res.data.result;
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
          this.AssignedExperimentList$ = res.data.result;
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
          this.AssignedExperimentList$ = res.data.result;
        },
        error: (any) => {},
      });
  }

  paginate() {
    if (this.next) {
      this.http.getNext(this.next).subscribe({
        next: (res) => {
          this.AssignedExperimentList$ = res.data.result;
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
          this.AssignedExperimentList$ = res.data.result;
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
  //     AssignedExperimentActions.loadAssignedExperimentNext({
  //       pagination: page,
  //     })
  //   );
  // }
}
