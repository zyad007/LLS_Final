import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { CoursesPageActions } from '../../store/courses/action/course-type';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  courseForm!: FormGroup;
  constructor(
    private builder: FormBuilder,
    private http: HttpService,
    private store: Store,
    private router: Router,
    public authServices: AuthService
  ) {}
  errorMessages = {
    name: {
      required: 'Name is required',
    },

    code: {
      required: 'Code is required',
    },
    description: {
      required: 'Description is required',
    },
    startDate: {
      required: 'StartDate is required',
    },
    endDate: {
      required: 'EndDate is required',
    },
  };
  ngOnInit(): void {
    this.InitForm();
  }

  /* Return AbstractControl To Form Control */
  formControlData(formControl: any): FormControl {
    return this.courseForm.get(formControl) as FormControl;
  }

  // Init Form
  InitForm(): void {
    this.courseForm = this.builder.group({
      name: new FormControl(null, {
        validators: [Validators.required],
      }),

      code: new FormControl(null, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [Validators.required],
      }),
      startDate: new FormControl(null, {
        validators: [Validators.required],
      }),
      endDate: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  onSubmit() {
    let body = this.courseForm.value;
    let date = new Date(this.courseForm.get('startDate')?.value);
    let date2 = new Date(this.courseForm.get('endDate')?.value);
    body['startDate'] = date;
    body['endDate'] = date2;
    this.store.dispatch(CoursesPageActions.sumbitCourses({ payload: body }));
    setTimeout(() => {
      this.courseForm.reset();
      this.router.navigate(['user/courses']);
    }, 1000);
  }
}
