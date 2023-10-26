import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/core/services/http.service';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';
import { UserDetailsActions } from '../../store/user-details/action/user-details-type';
import { selectUserDetailsContent } from '../../store/user-details/selectors/user-details.selectors';
import { UsersPageActions } from '../../store/users/action/users-type';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  UserEditForm!: FormGroup;
  @Input() itemId!: string;
  UserDetails$!: any;
  test!: string;
  allRoles!: [];

  constructor(
    private builder: FormBuilder,
    private store: Store,
    private http: HttpService,
    private courseServices: CoursesService
  ) {}
  errorMessages = {
    firstName: {
      required: 'firstName is required',
    },
    lastName: {
      required: 'lastName is required',
    },
    // email: {
    //   required: 'email is required',
    // },
    phoneNumber: {
      required: 'phoneNumber is required',
    },
    academicYear: {
      required: 'academicYear is required',
    },
    role: {
      required: 'role is required',
    },
    country: {
      required: 'country is required',
    },
    city: {
      required: 'city is required',
    },
    gender: {
      required: 'gender is required',
    },
  };
  ngOnInit(): void {
    this.store.dispatch(UserDetailsActions.loadUserDetail({ id: this.itemId }));
    this.store
      .select(selectUserDetailsContent(this.itemId))
      .subscribe((res) => {
        if (res) this.UserDetails$ = res?.data;
        this.InitForm();
      });
    this.http.get('/api/Role/All').subscribe((res) => {
      this.allRoles = res?.data;
    });
  }

  /* Return AbstractControl To Form Control */
  formControlData(formControl: any): FormControl {
    return this.UserEditForm.get(formControl) as FormControl;
  }

  // Init Form
  InitForm(): void {
    this.UserEditForm = this.builder.group({
      firstName: new FormControl(
        this.UserDetails$?.firstName ? this.UserDetails$?.firstName : '',
        {
          validators: [Validators.required],
        }
      ),

      lastName: new FormControl(
        this.UserDetails$?.lastname ? this.UserDetails$.lastname : '',
        {
          validators: [Validators.required],
        }
      ),
      // email: new FormControl(
      //   this.UserDetails$?.email ? this.UserDetails$.email : '',
      //   {
      //     validators: [Validators.required],
      //   }
      // ),

      role: new FormControl(
        this.UserDetails$?.role ? this.UserDetails$.role : '',
        {
          validators: [Validators.required],
        }
      ),
      phoneNumber: new FormControl(
        this.UserDetails$?.phoneNumber ? this.UserDetails$.phoneNumber : '',
        {
          validators: [Validators.required],
        }
      ),
      country: new FormControl(
        this.UserDetails$?.country ? this.UserDetails$.country : '',
        {
          validators: [Validators.required],
        }
      ),
      city: new FormControl(
        this.UserDetails$?.city ? this.UserDetails$.city : '',
        {
          validators: [Validators.required],
        }
      ),
      academicYear: new FormControl(
        this.UserDetails$?.academicYear ? this.UserDetails$.academicYear : '',
        {
          validators: [Validators.required],
        }
      ),
      gender: new FormControl(
        this.UserDetails$?.gender ? this.UserDetails$.gender : '',
        {
          validators: [Validators.required],
        }
      ),
    });
  }
  showId() {}
  onSubmit() {
    let body = { ...this.UserEditForm.value };
    this.store.dispatch(
      UsersPageActions.editUsers({ payload: body, id: this.itemId })
    );
    setTimeout(() => {
      this.UserEditForm.reset();
      this.courseServices.editUserForm = false;
    }, 1500);
  }
}
