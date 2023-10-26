import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/core/services/http.service';
import { CustomValidatorsService } from 'src/app/shared/services/custom-validators.service';
import { UsersPageActions } from '../../store/users/action/users-type';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  allRoles!: [];
  imageUrl: any;
  errorMessge: boolean = false;
  constructor(
    private builder: FormBuilder,
    private http: HttpService,
    private store: Store,
    private router: Router
  ) {}
  errorMessages = {
    firstName: {
      required: 'firstName is required',
    },
    lastName: {
      required: 'lastName is required',
    },
    email: {
      required: 'email is required',
    },
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
    password: {
      required: 'password is required',
    },
    imageUrl: {
      required: 'imageUrl is required',
    },
  };
  ngOnInit(): void {
    this.http.get('/api/Role/All').subscribe((res) => {
      this.allRoles = res.data;
    });
    this.InitForm();
  }

  /* Return AbstractControl To Form Control */
  formControlData(formControl: any): FormControl {
    return this.userForm.get(formControl) as FormControl;
  }

  // Init Form
  InitForm(): void {
    this.userForm = this.builder.group({
      firstName: new FormControl(null, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required],
      }),

      country: new FormControl(null, {
        validators: [Validators.required],
      }),
      city: new FormControl(null, {
        validators: [Validators.required],
      }),
      phoneNumber: new FormControl(null, {
        validators: [Validators.required, CustomValidatorsService.isPhone],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, CustomValidatorsService.isEmail],
      }),
      academicYear: new FormControl(null, {
        validators: [Validators.required],
      }),
      gender: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
      role: new FormControl(null, {
        validators: [Validators.required],
      }),
      imageUrl: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  onSubmit() {
    // if (this.userForm.invalid) {
    //   this.userForm.markAllAsTouched();
    //   return;
    // }
    let body = this.userForm.value;
    body['imgUrl'] = this.imageUrl;
    // if (this.imageUrl) {
    this.store.dispatch(UsersPageActions.sumbitUsers({ payload: body }));
    setTimeout(() => {
      this.userForm.reset();
      this.router.navigate(['user/users']);
    }, 1500);
  }
  uploadFile(event: any) {
    let formdata = new FormData();
    formdata.append('imageUpload', event.files[0]);
    this.http.postRequest('/api/User/Profile', formdata).subscribe({
      next: (res: any) => {
        this.imageUrl = res.url;
      },
      error: (err) => {},
    });
  }
}
