import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CoursesService } from '../../services/courses.service';
import { CourseDetailsActions } from '../../store/course-details/action/course-details-type';
import { selectCourseDetailsContent } from '../../store/course-details/selectors/course-details.selectors';
import { CoursesPageActions } from '../../store/courses/action/course-type';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
  CourseEditForm!: FormGroup;
  @Input() itemId!: string;
  // CourseDetails$!: Observable<CourseDetailsGetResponse | null>;
  CourseDetails$!: any;
  test!: string;

  // id: any;

  constructor(
    private builder: FormBuilder,
    public courseServices: CoursesService,
    private store: Store,

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
    this.store.dispatch(
      CourseDetailsActions.loadCourseDetail({ id: this.itemId })
    );
    this.store
      .select(selectCourseDetailsContent(this.itemId))
      .subscribe((res) => {
        if (res) this.CourseDetails$ = res?.data;
        this.InitForm();
      });
  }

  /* Return AbstractControl To Form Control */
  formControlData(formControl: any): FormControl {
    return this.CourseEditForm.get(formControl) as FormControl;
  }

  // Init Form
  InitForm(): void {
    this.CourseEditForm = this.builder.group({
      name: new FormControl(
        this.CourseDetails$?.name ? this.CourseDetails$?.name : '',
        {
          validators: [Validators.required],
        }
      ),

      description: new FormControl(
        this.CourseDetails$?.description ? this.CourseDetails$.description : '',
        {
          validators: [Validators.required],
        }
      ),
      code: new FormControl(
        this.CourseDetails$?.code ? this.CourseDetails$.code : '',
        {
          validators: [Validators.required],
        }
      ),

      startDate: new FormControl(
        this.CourseDetails$?.startDate ? this.CourseDetails$.startDate : '',
        {
          validators: [Validators.required],
        }
      ),
      endDate: new FormControl(
        this.CourseDetails$?.endDate ? this.CourseDetails$.endDate : '',
        {
          validators: [Validators.required],
        }
      ),
    });
  }
  showId() {}
  onSubmit() {
    let body = this.CourseEditForm.value;
    let date = new Date(this.CourseEditForm.get('startDate')?.value);
    let date2 = new Date(this.CourseEditForm.get('endDate')?.value);
    body['startDate'] = date;
    body['endDate'] = date2;
    this.store.dispatch(
      CoursesPageActions.editCourses({ payload: body, id: this.itemId })
    );
    this.CourseEditForm.reset();
    this.courseServices.editCourseForm = false;
  }
}
