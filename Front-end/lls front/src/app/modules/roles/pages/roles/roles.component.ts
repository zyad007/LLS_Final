import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';
import { Role } from '../../models/roles';
import { RolesPageActions } from '../../store/roles/action/roles-type';
import {
  selectRolesCurrentPage,
  selectRolesList,
  selectRolesNumberOfPages,
} from '../../store/roles/selector/roles.selectors';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  // RolesList$!: Observable<Role[] | null>;
  RolesList$!: Role[];
  RolesPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  id!: string;
  next!:any;
  pervious!:any;
  constructor(private store: Store, public courseServices: CoursesService,private http:HttpService) {}

  ngOnInit(): void {
    // this.store.dispatch(RolesPageActions.loadRolesPage());
    // this.RolesList$ = this.store.select(selectRolesList);
    // this.RolesPageNumber$ = this.store.select(selectRolesNumberOfPages);
    // this.currentPageNumber$ = this.store.select(selectRolesCurrentPage);
    this.http.get('/api/Role').subscribe({
      next: (res) => {
        console.log(res);
        this.RolesList$ = res.data.result;
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
    this.http.get(`/api/Role/?searchByName=${searchText}`).subscribe({
      next: (res) => {
        this.RolesList$ = res.data.result;
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
          this.RolesList$ = res.data.result;
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
          this.RolesList$ = res.data.result;
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
  //     RolesPageActions.loadRolesNext({
  //       pagination: page,
  //     })
  //   );
  // }
  showDiloagEdit(RoleId: string) {
    this.courseServices.editRoleForm = true;
    this.id = RoleId;
  }
}
