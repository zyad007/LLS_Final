import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { TeacherStudent } from '../../models/teachers-students';
import { CoursesService } from '../../services/courses.service';
import { TeacherStudentActions } from '../../store/all-teacher-student/action/teacher-student-type';
import {
  selectAllTeacherUnAssigned,
  selectTeacherStudentCurrentPage,
  selectTeacherStudentNumberOfPages,
} from '../../store/all-teacher-student/selectors/teacher-student.selectors';
import { TeacherActions } from '../../store/teachers/action/teachers-type';

@Component({
  selector: 'app-all-teacher',
  templateUrl: './all-teacher.component.html',
  styleUrls: ['./all-teacher.component.scss'],
})
export class AllTeacherComponent implements OnInit {
  @Output('hide') hide = new EventEmitter<boolean>(false);
  @Input('item') item!: boolean;
  itemId!: string;
  allTeachers$!: Observable<TeacherStudent[] | null>;
  TeacherPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  isCheckBox: boolean = false;
  // displayTeacher: boolean = false;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public courseService: CoursesService,
    public authServices: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
      this.store.dispatch(
        TeacherStudentActions.loadAllTeacherStudent({ id: params['id'] })
      );
      this.allTeachers$ = this.store.select(
        selectAllTeacherUnAssigned(this.itemId)
      );

      this.TeacherPageNumber$ = this.store.select(
        selectTeacherStudentNumberOfPages(this.itemId)
      );
      this.currentPageNumber$ = this.store.select(
        selectTeacherStudentCurrentPage(this.itemId)
      );
    });
    console.log(this.courseService.displayTeacher);
  }
  paginate(page: number, pages: number[]) {
    if (page < 1 || page > pages.length) return;
    this.store.dispatch(
      TeacherStudentActions.loadAllTeacherStudentNext({
        pagination: page,
        id: this.itemId,
      })
    );
  }
  assignTeacher(userId: string) {
    this.store.dispatch(
      TeacherActions.sumbitTeacher({
        courseId: this.itemId,
        userId,
      })
    );
    setTimeout(() => {
      window.location.reload();
      this.courseService.displayTeacher = false;
    }, 1000);
  }
  addOneTeacher() {
    this.isCheckBox = true;
  }
  closeDialog() {
    this.courseService.displayTeacher = false;
    this.isCheckBox = false;
  }
}
