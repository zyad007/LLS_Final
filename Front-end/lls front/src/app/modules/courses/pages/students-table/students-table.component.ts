import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { UsersPageActions } from 'src/app/modules/roles/store/users/action/users-type';
import { Student } from '../../models/students';
import { CoursesService } from '../../services/courses.service';
import { AllStudentsActions } from '../../store/all-students/action/all-students-type';
import { StudentActions } from '../../store/students/action/students-type';
import {
  selectStudentCurrentPage,
  selectStudentList,
  selectStudentNumberOfPages,
} from '../../store/students/selectors/students.selectors';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent implements OnInit {
  itemId!: string;
  // students$!: Observable<Student[] | null>;
  students$!: Student[];
  StudentPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  next!: any;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public courseService: CoursesService,
    public authServices: AuthService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
      // this.store.dispatch(StudentActions.loadStudentPage({ id: params['id'] }));
      // this.students$ = this.store.select(selectStudentList(this.itemId));

      // this.StudentPageNumber$ = this.store.select(
      //   selectStudentNumberOfPages(this.itemId)
      // );
      // this.currentPageNumber$ = this.store.select(
      //   selectStudentCurrentPage(this.itemId)
      // );
      this.http.get(`/api/Course/${this.itemId}/Students`).subscribe({
        next: (res) => {
          console.log(res);
          this.students$ = res.data.result;
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
      .get(`/api/Course/${this.itemId}/?searchByEmail=${searchText}`)
      .subscribe({
        next: (res) => {
          this.students$ = res.data;
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
          this.students$ = res.data;
          this.next = res.data.next;
        },
        error: (any) => {},
      });
    }
  }

  // paginate(page: number, pages: number[]) {
  //   if (page < 1 || page > pages.length) return;
  //   this.store.dispatch(
  //     StudentActions.loadStudentNext({
  //       pagination: page,
  //       id: this.itemId,
  //     })
  //   );
  // }
  addStudent() {
    this.courseService.displayStudent = true;
    this.store.dispatch(AllStudentsActions.loadAllStudent({ id: this.itemId }));
  }
  deletUser(UserId: any) {
    this.store.dispatch(UsersPageActions.deleteYourUser({ UserId }));
    // window.location.reload();
  }
}
