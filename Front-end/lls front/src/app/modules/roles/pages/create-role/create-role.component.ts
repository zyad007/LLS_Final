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
import { RolesPageActions } from '../../store/roles/action/roles-type';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
})
export class CreateRoleComponent implements OnInit {
  roleForm!: FormGroup;
  allPermission!: [];
  permissionsSelected: string[] = [];
  constructor(
    private builder: FormBuilder,
    private http: HttpService,
    private store: Store,
    private router: Router
  ) {}
  errorMessages = {
    name: {
      required: 'firstName is required',
    },
    permissions: {
      required: 'permissions is required',
    },
  };
  ngOnInit(): void {
    this.http.get('/api/Role/All-Permissions').subscribe((res) => {
      this.allPermission = res?.data;
    });
    this.InitForm();
  }

  /* Return AbstractControl To Form Control */
  formControlData(formControl: any): FormControl {
    return this.roleForm.get(formControl) as FormControl;
  }

  // Init Form
  InitForm(): void {
    this.roleForm = this.builder.group({
      name: new FormControl(null, {
        validators: [Validators.required],
      }),
      permissions: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  addPermission(val: string) {
    this.permissionsSelected.push(val);
  }
  addAllPermission() {
    this.permissionsSelected = this.allPermission;
  }
  onSubmit() {
    let body = this.roleForm.value;
    body['permissions'] = this.permissionsSelected;
    this.store.dispatch(RolesPageActions.sumbitRoles({ payload: body }));
    setTimeout(() => {
      this.roleForm.reset();
      this.router.navigate(['user/users']);
    }, 1500);
  }
}
