import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/core/services/http.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';
import { RoleDetailsActions } from '../../store/role-details/action/role-details-type';
import { selectRoleDetailsContent } from '../../store/role-details/selectors/role-details.selectors';
import { RolesPageActions } from '../../store/roles/action/roles-type';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss'],
})
export class EditRoleComponent implements OnInit {
  RoleEditForm!: FormGroup;
  @Input() itemId!: string;
  RoleDetails$!: any;
  test!: string;
  permissionsSelected: string[] = [];
  allPermission: any;

  constructor(
    private builder: FormBuilder,
    private store: Store,
    private http: HttpService,
    private courseServices: CoursesService,
    private localStorage: LocalStorageService
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
    this.store.dispatch(RoleDetailsActions.loadRoleDetail({ id: this.itemId }));
    this.store
      .select(selectRoleDetailsContent(this.itemId))
      .subscribe((res) => {
        if (res) this.RoleDetails$ = res?.data;
        this.InitForm();
      });
    this.http.get('/api/Role/All-Permissions').subscribe((res) => {
      this.allPermission = res?.data;
    });
  }

  /* Return AbstractControl To Form Control */
  formControlData(formControl: any): FormControl {
    return this.RoleEditForm.get(formControl) as FormControl;
  }

  // Init Form
  InitForm(): void {
    this.RoleEditForm = this.builder.group({
      name: new FormControl(
        this.RoleDetails$?.name ? this.RoleDetails$?.name : '',
        {
          validators: [Validators.required],
        }
      ),
      permissions: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  showId() {}
  addPermission(val: string) {
    this.permissionsSelected.push(val);
  }
  onSubmit() {
    let body = { ...this.RoleEditForm.value };
    body['permissions'] = this.permissionsSelected;
    this.store.dispatch(
      RolesPageActions.editRoles({ payload: body, id: this.itemId })
    );
    setTimeout(() => {
      this.RoleEditForm.reset();
      this.courseServices.editRoleForm = false;
    }, 1000);
  }
  addAllPermission() {
    this.permissionsSelected = this.allPermission;
  }
}
