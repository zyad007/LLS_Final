import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Lab } from '../../models/lab';
import { LabsPageActions } from '../../store/labs/action/lab-type';
import {
  selectLabsCurrentPage,
  selectLabsList,
  selectLabsNumberOfPages,
} from '../../store/labs/selector/lab.selectors';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
})
export class LabComponent implements OnInit {
  // LabsList$!: Observable<Lab[] | null>;
  LabsList$!: Lab[];
  next!: any;
  pervious!: any;
  LabsPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  editLabForm: boolean = false;
  id!: string;
  value: number = 50;
  constructor(
    private store: Store,
    public authServices: AuthService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(LabsPageActions.loadLabsPage());
    // this.LabsList$ = this.store.select(selectLabsList);
    // this.LabsPageNumber$ = this.store.select(selectLabsNumberOfPages);
    // this.currentPageNumber$ = this.store.select(selectLabsCurrentPage);
    this.http.get('/api/Active-Lab/?page=1').subscribe({
      next: (res) => {
        console.log(res);
        this.LabsList$ = res.data.result;
        if (res.data.next) {
          this.next = res.data.next;
        }
        if (res.data.pervious) {
          this.pervious = res.data.pervious;
        }
      },
      error: (any) => {},
    });
  }
  searchByName(searchText: string) {
    this.http
      .get(`/api/Active-Lab/?searchByExperimentName=${searchText}`)
      .subscribe({
        next: (res) => {
          this.LabsList$ = res.data.result;
          if (res.data?.next) {
            this.next = res.data?.next;
          }
        },
        error: (any) => {},
      });
  }
  searchByCourseName(searchText: string) {
    this.http
      .get(`/api/Active-Lab/?searchByCourseName=${searchText}`)
      .subscribe({
        next: (res) => {
          this.LabsList$ = res.data.result;
        },
        error: (any) => {},
      });
  }
  searchByAcademicYear(searchText: string) {
    this.http
      .get(`/api/Active-Lab/?searchByAcademicYear=${searchText}`)
      .subscribe({
        next: (res) => {
          this.LabsList$ = res.data.result;
          if (res.data?.next) {
            this.next = res.data?.next;
          }
        },
        error: (any) => {},
      });
  }
  paginate() {
    // if (page < 1 || page > pages.length) return;
    // this.store.dispatch(
    //   LabsPageActions.loadLabsNext({
    //     pagination: page,
    //   })
    // );
    if (this.next) {
      this.http.getNext(this.next).subscribe({
        next: (res) => {
          this.LabsList$ = res.data.result;
          this.next=res.data.next
          this.pervious=res.data.pervious
        },
        error: (any) => {},
      });
    }
  }
  perviousP() {
    if (this.pervious) {
      this.http.get(this.pervious).subscribe({
        next: (res) => {
          this.LabsList$ = res.data.result;
          this.next = res.data.next;
          this.pervious = res.data.pervious;
        },
        error: (any) => {},
      });
    }
  }
}
