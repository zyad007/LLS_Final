import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';
import { User } from '../../models/users';
import { UsersPageActions } from '../../store/users/action/users-type';
import {
  selectUsersCurrentPage,
  selectUsersList,
  selectUsersNumberOfPages,
} from '../../store/users/selector/users.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  // UsersList$!: Observable<User[] | null>;
  UsersList$!: User[];
  UsersPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  id!: string;
  next!: any;
  pervious!: any;
  constructor(
    private store: Store,
    public courseServices: CoursesService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(UsersPageActions.loadUsersPage());
    // this.UsersList$ = this.store.select(selectUsersList);
    // this.UsersPageNumber$ = this.store.select(selectUsersNumberOfPages);
    // this.currentPageNumber$ = this.store.select(selectUsersCurrentPage);
    this.http.get('/api/User').subscribe({
      next: (res) => {
        console.log(res);
        this.UsersList$ = res.data.result;
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
    this.http.get(`/api/User/?searchByEmail=${searchText}`).subscribe({
      next: (res) => {
        this.UsersList$ = res.data.result;
        if (res.data?.next) {
          this.next = res.data?.next;
        }
      },
      error: (any) => {},
    });
  }
  searchByCourseName(searchText: string) {
    this.http.get(`/api/User/?searchByFirstName=${searchText}`).subscribe({
      next: (res) => {
        this.UsersList$ = res.data.result;
      },
      error: (any) => {},
    });
  }
  searchByLastName(searchText: string) {
    this.http.get(`/api/User/?searchByLastName=${searchText}`).subscribe({
      next: (res) => {
        this.UsersList$ = res.data.result;
      },
      error: (any) => {},
    });
  }

  paginate() {
    if (this.next) {
      this.http.getNext(this.next).subscribe({
        next: (res) => {
          this.UsersList$ = res.data.result;
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
          this.UsersList$ = res.data.result;
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
  //     UsersPageActions.loadUsersNext({
  //       pagination: page,
  //     })
  //   );
  // }
  showDiloagEdit(UserId: string) {
    this.courseServices.editUserForm = true;
    this.id = UserId;
  }
  deletUser(UserId: any) {
    this.store.dispatch(UsersPageActions.deleteYourUser({ UserId }));
    this.http.get('/api/User').subscribe({
      next: (res) => {
        this.UsersList$ = res.data.result;
        if (res.data?.next) {
          this.next = res.data?.next;
        }
      },
      error: (any) => {},
    });
  }
}
