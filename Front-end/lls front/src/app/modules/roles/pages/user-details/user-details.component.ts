import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { Experiment } from 'src/app/modules/courses/models/experiment';
import { UsersService } from 'src/app/modules/users/services/users.service';
import { UserDetailsGetResponse } from '../../models/user-details';
import { UserDetailsActions } from '../../store/user-details/action/user-details-type';
import { selectUserDetailsContent } from '../../store/user-details/selectors/user-details.selectors';
import { UsersPageActions } from '../../store/users/action/users-type';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  UserDetails$!: Observable<UserDetailsGetResponse | null>;
  experiments$!: Observable<Experiment[] | null>;
  id!: string;
  ExperimentPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private httpService: HttpService,
    public UserService: UsersService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.store.dispatch(
        UserDetailsActions.loadUserDetail({ id: params['id'] })
      );
      this.UserDetails$ = this.store.select(selectUserDetailsContent(this.id));
    });
  }

  deletUser(UserId: any) {
    this.store.dispatch(UsersPageActions.deleteYourUser({ UserId }));
    setTimeout(() => {
      this.router.navigate(['/user', 'users']);
    }, 1000);
  }
}
