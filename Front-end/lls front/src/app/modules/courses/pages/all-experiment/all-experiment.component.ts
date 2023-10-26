import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ExperimentsActions } from 'src/app/modules/show-experiment/store/experiment/action/show-experiment-type';
import {
  selectExperimentsShCurrentPage,
  selectExperimentsShList,
  selectExperimentsShNumberOfPages,
} from 'src/app/modules/show-experiment/store/experiment/selector/show-experiment.selectors';
import { Experiment } from '../../models/experiment';
import { CoursesService } from '../../services/courses.service';
import { ExperimentActions } from '../../store/experiments/action/experiments-type';

@Component({
  selector: 'app-all-experiment',
  templateUrl: './all-experiment.component.html',
  styleUrls: ['./all-experiment.component.scss'],
})
export class AllExperimentComponent implements OnInit {
  ExperimentsList$!: Observable<Experiment[] | any>;
  ExperimentsPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  isCheckBoxExperiment: boolean = false;
  id!: string;
  experimentForm!: FormGroup;
  errorMessages = {
    numberOfTrials: {
      required: 'Number Of Trials is required',
    },
    startDate: {
      required: 'StartDate is required',
    },
    endDate: {
      required: 'EndDate is required',
    },
  };
  isExperiment: boolean = false;
  exId!: string;
  courseIdd: any;
  constructor(
    private store: Store,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private http: HttpService,
    public authServices: AuthService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseIdd = params['id'];
    });
    this.store.dispatch(ExperimentsActions.loadShExperiments());
    this.ExperimentsList$ = this.store.select(selectExperimentsShList);
    this.ExperimentsPageNumber$ = this.store.select(
      selectExperimentsShNumberOfPages
    );
    this.currentPageNumber$ = this.store.select(selectExperimentsShCurrentPage);
    this.InitForm();
  }
  paginate(page: number, pages: number[]) {
    if (page < 1 || page > pages.length) return;
    this.store.dispatch(
      ExperimentsActions.loadShExperimentsNext({
        pagination: page,
      })
    );
  }
  assignExperiment(exId: string) {
    this.isExperiment = true;
    this.exId = exId;
  }
  addExperiment() {
    this.isCheckBoxExperiment = true;
  }
  /* Return AbstractControl To Form Control */
  formControlData(formControl: any): FormControl {
    return this.experimentForm.get(formControl) as FormControl;
  }

  // Init Form
  InitForm(): void {
    this.experimentForm = this.builder.group({
      numberOfTrials: new FormControl(null, {
        validators: [Validators.required],
      }),
      startDate: new FormControl(null, {
        validators: [Validators.required],
      }),
      endDate: new FormControl(null, {
        validators: [Validators.required],
      }),
      expIdd: new FormControl(null, {
        validators: [],
      }),
    });
  }
  onSubmit() {
    if (this.experimentForm.invalid) {
      // this.experimentForm.markAllAsTouched();
      return;
    }
    let body = this.experimentForm.value;
    let date = new Date(this.experimentForm.get('startDate')?.value);
    let date2 = new Date(this.experimentForm.get('endDate')?.value);
    body['startDate'] = date;
    body['endDate'] = date2;
    body['expIdd'] = this.exId;

    this.store.dispatch(
      ExperimentActions.assignExperiment({
        courseId: this.courseIdd,
        payload: body,
      })
    );
    setTimeout(() => {
      this.experimentForm.reset();
      this.isExperiment = false;
      window.location.reload();
      this.courseService.isAssignExperiment = false;
    }, 1500);
  }
}
