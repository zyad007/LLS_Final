import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { AllStudent } from '../../models/all-student';
import { CoursesService } from '../../services/courses.service';
import { AllStudentsActions } from '../../store/all-students/action/all-students-type';
import {
  selectAllStudentCurrentPage,
  selectAllStudentNumberOfPages,
  selectAllStudentUnAssigned,
} from '../../store/all-students/selectors/all-students.selectors';
import { StudentActions } from '../../store/students/action/students-type';

@Component({
  selector: 'app-all-student',
  templateUrl: './all-student.component.html',
  styleUrls: ['./all-student.component.scss'],
})
export class AllStudentComponent implements OnInit {
  @Output('hide') hide = new EventEmitter<boolean>(false);
  @Input('item') item!: boolean;
  itemId!: string;
  allStudents$!: Observable<AllStudent[] | null>;
  StudentPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  isCheckBox: boolean = false;
  allStudentIds: any[] = [];
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
        AllStudentsActions.loadAllStudent({ id: params['id'] })
      );
      this.allStudents$ = this.store.select(
        selectAllStudentUnAssigned(this.itemId)
      );

      this.StudentPageNumber$ = this.store.select(
        selectAllStudentNumberOfPages(this.itemId)
      );
      this.currentPageNumber$ = this.store.select(
        selectAllStudentCurrentPage(this.itemId)
      );
    });
  }
  paginate(page: number, pages: number[]) {
    if (page < 1 || page > pages.length) return;
    this.store.dispatch(
      AllStudentsActions.loadAllStudentNext({
        pagination: page,
        id: this.itemId,
      })
    );
  }
  assignStudent() {
    let data = { userIdds: this.allStudentIds };
    this.store.dispatch(
      StudentActions.sumbitStudent({
        courseId: this.itemId,
        userIdds: data,
      })
    );
    setTimeout(() => {
      window.location.reload();
      this.courseService.displayStudent = false;
      this.isCheckBox = false;
    }, 1000);
  }
  addOneStudent() {
    this.isCheckBox = true;
  }
  closeDialog() {
    this.courseService.displayStudent = false;
    this.isCheckBox = false;
  }
  addAllStudents(id: string) {
    this.allStudentIds.push(id);
  }
}
