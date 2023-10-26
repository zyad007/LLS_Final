import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PermissionsPageActions } from '../../store/permissions/action/permissions-type';
import {
  selectPermissionsCurrentPage,
  selectPermissionsList,
  selectPermissionsNumberOfPages,
} from '../../store/permissions/selector/permissions.selectors';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  PermissionsList$!: Observable<any>;
  PermissionsPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  editPermissionForm: boolean = false;
  id!: string;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(PermissionsPageActions.loadPermissionsPage());
    this.PermissionsList$ = this.store.select(selectPermissionsList);
    this.PermissionsPageNumber$ = this.store.select(
      selectPermissionsNumberOfPages
    );
    this.currentPageNumber$ = this.store.select(selectPermissionsCurrentPage);
  }
  paginate(page: number, pages: number[]) {
    if (page < 1 || page > pages.length) return;
    this.store.dispatch(
      PermissionsPageActions.loadPermissionsNext({
        pagination: page,
      })
    );
  }
  showDiloagEdit(PermissionId: string) {
    this.editPermissionForm = true;
    this.id = PermissionId;
  }
}
