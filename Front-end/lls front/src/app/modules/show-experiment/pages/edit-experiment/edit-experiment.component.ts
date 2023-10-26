import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';
import { ExperimentDetailsActions } from '../../store/experiment-details/action/experiment-details-type';
import { selectExperimentDetailsContent } from '../../store/experiment-details/selectors/experiment-details.selectors';
import { ExperimentsActions } from '../../store/experiment/action/show-experiment-type';

@Component({
  selector: 'app-edit-experiment',
  templateUrl: './edit-experiment.component.html',
  styleUrls: ['./edit-experiment.component.scss'],
})
export class EditExperimentComponent implements OnInit {
  experimentEditForm!: FormGroup;
  @Input() itemId!: string;
  // ExperimentDetails$!: Observable<ExperimentDetailsGetResponse | null>;
  ExperimentDetails$!: any;
  test!: string;
  // id: any;

  constructor(
    private builder: FormBuilder,
    private courseServices: CoursesService,
    private store: Store,

    public authServices: AuthService
  ) {}
  errorMessages = {
    name: {
      required: 'Name is required',
    },

    description: {
      required: 'Description is required',
    },
  };
  ngOnInit(): void {
    this.store.dispatch(
      ExperimentDetailsActions.loadExperimentDetail({ id: this.itemId })
    );
    this.store
      .select(selectExperimentDetailsContent(this.itemId))
      .subscribe((res) => {
        if (res) this.ExperimentDetails$ = res?.data;
        this.InitForm();
      });
  }

  /* Return AbstractControl To Form Control */
  formControlData(formControl: any): FormControl {
    return this.experimentEditForm.get(formControl) as FormControl;
  }

  // Init Form
  InitForm(): void {
    this.experimentEditForm = this.builder.group({
      name: new FormControl(
        this.ExperimentDetails$?.name ? this.ExperimentDetails$?.name : '',
        {
          validators: [Validators.required],
        }
      ),

      description: new FormControl(
        this.ExperimentDetails$?.description
          ? this.ExperimentDetails$.description
          : '',
        {
          validators: [Validators.required],
        }
      ),
    });
  }
  showId() {}
  onSubmit() {
    let body = this.experimentEditForm.value;
    this.store.dispatch(
      ExperimentsActions.editShExperiments({ payload: body, id: this.itemId })
    );
    setTimeout(() => {
      this.experimentEditForm.reset();
      this.courseServices.editExperimentForm = false;
    }, 1000);
  }
}
