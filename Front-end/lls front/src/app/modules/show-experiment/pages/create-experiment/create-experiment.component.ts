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
import { ExperimentsActions } from '../../store/experiment/action/show-experiment-type';

@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.scss'],
})
export class CreateExperimentComponent implements OnInit {
  experimentForm!: FormGroup;
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

    description: {
      required: 'Description is required',
    },
  };
  ngOnInit(): void {
    this.InitForm();
  }

  /* Return AbstractControl To Form Control */
  formControlData(formControl: any): FormControl {
    return this.experimentForm.get(formControl) as FormControl;
  }

  // Init Form
  InitForm(): void {
    this.experimentForm = this.builder.group({
      name: new FormControl(null, {
        validators: [Validators.required],
      }),

      description: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  onSubmit() {
    let body = this.experimentForm.value;
    this.store.dispatch(
      ExperimentsActions.sumbitShExperiments({ payload: body })
    );
    this.experimentForm.reset();
  }
}
