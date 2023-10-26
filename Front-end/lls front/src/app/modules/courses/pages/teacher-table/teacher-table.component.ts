import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Teacher } from '../../models/teachers';
import { CoursesService } from '../../services/courses.service';
import { TeacherActions } from '../../store/teachers/action/teachers-type';
import {
  selectTeacherCurrentPage,
  selectTeacherList,
  selectTeacherNumberOfPages,
} from '../../store/teachers/selectors/teachers.selectors';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.scss'],
})
export class TeacherTableComponent implements OnInit {
  itemId!: string;
  // teachers$!: Observable<Teacher[] | null>;
  teachers$!: Teacher[];
  TeacherPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  isCheckBox: boolean = false;
  next!: any;
  // displayTeacher: boolean = false;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private courseService: CoursesService,
    public authServices: AuthService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
      // this.store.dispatch(TeacherActions.loadTeacherPage({ id: params['id'] }));
      // this.teachers$ = this.store.select(selectTeacherList(this.itemId));

      // this.TeacherPageNumber$ = this.store.select(
      //   selectTeacherNumberOfPages(this.itemId)
      // );
      // this.currentPageNumber$ = this.store.select(
      //   selectTeacherCurrentPage(this.itemId)
      // );
      this.http.get(`/api/Course/${this.itemId}/Teacher`).subscribe({
        next: (res) => {
          console.log(res);
          this.teachers$ = res.data.result;
          if (res.data?.next) {
            this.next = res.data?.next;
            console.log(this.next);
          }
        },
        error: (any) => {},
      });
    });
  }
  searchByName(searchText: string) {
    this.http
      .get(
        `/api/Course/${this.itemId}/?searchByEmail=${searchText}`
      )
      .subscribe({
        next: (res) => {
          this.teachers$ = res.data;
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
          this.teachers$ = res.data;
          this.next = res.data.next;
        },
        error: (any) => {},
      });
    }
  }

  // paginate(page: number, pages: number[]) {
  //   if (page < 1 || page > pages.length) return;
  //   this.store.dispatch(
  //     TeacherActions.loadTeacherNext({
  //       pagination: page,
  //       id: this.itemId,
  //     })
  //   );
  // }

  addTeacher() {
    this.courseService.displayTeacher = true;
  }
}
