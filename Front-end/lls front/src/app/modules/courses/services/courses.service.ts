import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  isExperiment = true;
  isTeacher = false;
  isStudent = false;
  displayTeacher: boolean = false;
  displayStudent: boolean = false;
  editCourseForm: boolean = false;
  editExperimentForm: boolean = false;
  editUserForm: boolean = false;
  editRoleForm: boolean = false;
  isAssignExperiment: boolean = false;
  constructor() {}
}
