import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Course } from 'src/app/modules/courses/models/courses';
import { CoursesPageActions } from 'src/app/modules/courses/store/courses/action/course-type';
import {
  selectCoursesCurrentPage,
  selectCoursesList,
  selectCoursesNumberOfPages,
} from 'src/app/modules/courses/store/courses/selector/courses.selectors';

@Component({
  selector: 'app-grade-book',
  templateUrl: './grade-book.component.html',
  styleUrls: ['./grade-book.component.scss'],
})
export class GradeBookComponent implements OnInit {
  coursesList$!: Observable<Course[] | null>;
  CoursesPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  editCourseForm: boolean = false;
  id!: string;
  constructor(private store: Store, public authServices: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(CoursesPageActions.loadCoursesPage());
    this.coursesList$ = this.store.select(selectCoursesList);
    this.CoursesPageNumber$ = this.store.select(selectCoursesNumberOfPages);
    this.currentPageNumber$ = this.store.select(selectCoursesCurrentPage);
  }
  paginate(page: number, pages: number[]) {
    if (page < 1 || page > pages.length) return;
    this.store.dispatch(
      CoursesPageActions.loadCoursesNext({
        pagination: page,
      })
    );
  }
}
