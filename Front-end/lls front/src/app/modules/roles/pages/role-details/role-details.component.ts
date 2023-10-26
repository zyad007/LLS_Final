import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoleDetailsGetResponse } from '../../models/role-details';
import { RolesService } from '../../services/roles.service';
import { RoleDetailsActions } from '../../store/role-details/action/role-details-type';
import { selectRoleDetailsContent } from '../../store/role-details/selectors/role-details.selectors';
import { RolesPageActions } from '../../store/roles/action/roles-type';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss'],
})
export class RoleDetailsComponent implements OnInit {
  RoleDetails$!: Observable<RoleDetailsGetResponse | null>;
  id!: string;
  ExperimentPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public RoleService: RolesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.store.dispatch(
        RoleDetailsActions.loadRoleDetail({ id: params['id'] })
      );
      this.RoleDetails$ = this.store.select(selectRoleDetailsContent(this.id));
    });
  }

  deletRole(RoleId: any) {
    this.store.dispatch(RolesPageActions.deleteYourRole({ RoleId }));
    setTimeout(() => {
      this.router.navigate(['/user', 'users']);
    }, 1000);
  }
}
