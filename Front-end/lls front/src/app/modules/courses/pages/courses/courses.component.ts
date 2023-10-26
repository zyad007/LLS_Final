import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Course } from '../../models/courses';
import { CoursesService } from '../../services/courses.service';
import { CoursesPageActions } from '../../store/courses/action/course-type';
import {
  selectCoursesCurrentPage,
  selectCoursesList,
  selectCoursesNumberOfPages,
} from '../../store/courses/selector/courses.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  // coursesList$!: Observable<Course[] | null>;
  coursesList$!: Course[];
  CoursesPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  id!: string;
  next!: any;
  pervious!: any;
  constructor(
    private store: Store,
    public authServices: AuthService,
    public courseServices: CoursesService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(CoursesPageActions.loadCoursesPage());
    // this.coursesList$ = this.store.select(selectCoursesList);
    // this.CoursesPageNumber$ = this.store.select(selectCoursesNumberOfPages);
    // this.currentPageNumber$ = this.store.select(selectCoursesCurrentPage);
    this.http.get('/api/Course').subscribe({
      next: (res) => {
        console.log(res);
        this.coursesList$ = res.data.result;
        if (res.data?.next) {
          this.next = res.data?.next;
          console.log(this.next);
        }
        if (res.data?.pervious) {
          this.next = res.data?.pervious;
        }
      },
      error: (any) => {},
    });
  }
  searchByName(searchText: string) {
    this.http.get(`/api/Course/?searchByCourseCode=${searchText}`).subscribe({
      next: (res) => {
        this.coursesList$ = res.data.result;
        if (res.data?.next) {
          this.next = res.data?.next;
        }
      },
      error: (any) => {},
    });
  }
  searchByCourseName(searchText: string) {
    this.http.get(`/api/Course/?searchByCourseName=${searchText}`).subscribe({
      next: (res) => {
        this.coursesList$ = res.data.result;
      },
      error: (any) => {},
    });
  }

  paginate() {
    if (this.next) {
      this.http.getNext(this.next).subscribe({
        next: (res) => {
          this.coursesList$ = res.data.result;
          this.next = res.data.next;
          this.pervious = res.data.previous;
        },
        error: (any) => {},
      });
    }
  }
  perviousP() {
    if (this.pervious) {
      this.http.get(this.pervious).subscribe({
        next: (res) => {
          this.coursesList$ = res.data.result;
          this.next = res.data.next;
          this.pervious = res.data.pervious;
        },
        error: (any) => {},
      });
    }
  }
  deletCourse(CourseId: any) {
    this.store.dispatch(CoursesPageActions.deleteYourCourse({ CourseId }));
  }
  // paginate(page: number, pages: number[]) {
  //   if (page < 1 || page > pages.length) return;
  //   this.store.dispatch(
  //     CoursesPageActions.loadCoursesNext({
  //       pagination: page,
  //     })
  //   );
  // }
  showDiloagEdit(courseId: string) {
    this.courseServices.editCourseForm = true;
    this.id = courseId;
  }
}
