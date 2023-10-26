import { ActionReducerMap } from '@ngrx/store';
import { AnalyticOnePage } from '../modules/analytics/models/analytics';
import { AnalyticCourseOnePage } from '../modules/analytics/models/analytics-course';
import { AnalyticsCourseReducer } from '../modules/analytics/store/analytics-courses/reducer/analytics-course.reducer';
import {
  AnalyticDetailsReducer,
  AnalyticDetailsState,
} from '../modules/analytics/store/analytics-ero/reducers/analtics-ero.reducers';
import { AnalyticsPageReducer } from '../modules/analytics/store/analytics/reducer/analytics.reducer';
import { AssignedExperimentOnePage } from '../modules/assigned-experiment/models/assigned-experiment';
import { AssignedExperimentReducer } from '../modules/assigned-experiment/store/assigned-ex/reducer/assigned-experiment.reducer';
import { CompletedExperimentOnePage } from '../modules/completed-experiment/models/completed-experiment';
import { CompletedExperimentReducer } from '../modules/completed-experiment/store/reducer/completed-experiment.reducer';
import { AllStudents } from '../modules/courses/models/all-student';
import { CourseOnePage } from '../modules/courses/models/courses';
import { Experiments } from '../modules/courses/models/experiment';
import { Students } from '../modules/courses/models/students';
import { Teachers } from '../modules/courses/models/teachers';
import { TeachersStudentss } from '../modules/courses/models/teachers-students';
import { AllStudentsReducer } from '../modules/courses/store/all-students/reducers/all-students.reducers';
import { TeacherStudentReducer } from '../modules/courses/store/all-teacher-student/reducers/teacher-student.reducers';
import {
  CourseDetailsReducer,
  CourseDetailsState,
} from '../modules/courses/store/course-details/reducers/course-details.reducers';
import { CoursesPageReducer } from '../modules/courses/store/courses/reducer/courses.reducer';
import { experimentPageReducer } from '../modules/courses/store/experiments/reducers/experiments.reducers';
import { StudentPageReducer } from '../modules/courses/store/students/reducers/students.reducers';
import { TeacherPageReducer } from '../modules/courses/store/teachers/reducers/teachers.reducers';
import { GradingOnePage } from '../modules/grade-book/models/grade-book';
import { GradingReducer } from '../modules/grade-book/store/grading/reducer/grade-book.reducer';
import { LabOnePage } from '../modules/lab/models/lab';
import { LabsPageReducer } from '../modules/lab/store/labs/reducer/lab.reducer';
import { PermissionOnePage } from '../modules/roles/models/permissions';
import { RoleOnePage } from '../modules/roles/models/roles';
import { UserOnePage } from '../modules/roles/models/users';
import { PermissionsPageReducer } from '../modules/roles/store/permissions/reducer/permissions.reducer';
import {
  RoleDetailsReducer,
  RoleDetailsState,
} from '../modules/roles/store/role-details/reducers/role-details.reducers';
import { RolesPageReducer } from '../modules/roles/store/roles/reducer/roles.reducer';
import {
  UserDetailsReducer,
  UserDetailsState,
} from '../modules/roles/store/user-details/reducers/user-details.reducers';
import { UsersPageReducer } from '../modules/roles/store/users/reducer/users.reducer';
import { ExperimentOnePage } from '../modules/show-experiment/models/show-experiment';
import {
  ExperimentDetailsReducer,
  ExperimentDetailsState,
} from '../modules/show-experiment/store/experiment-details/reducers/experiment-details.reducers';
import { ShExperimentsReducer } from '../modules/show-experiment/store/experiment/reducer/show-experiment.reducer';

export interface AppState {
  courses: CourseOnePage;
  CourseDetails: CourseDetailsState;
  ExperimentsSh: ExperimentOnePage;
  Experiments: Experiments;
  Students: Students;
  Teachers: Teachers;
  TeachersStudentss: TeachersStudentss;
  AllStudents: AllStudents;
  ExperimentDetails: ExperimentDetailsState;
  Grading: GradingOnePage;
  AssignedExperiment: AssignedExperimentOnePage;
  CompletedExperiment: CompletedExperimentOnePage;
  Users: UserOnePage;
  UserDetails: UserDetailsState;
  Roles: RoleOnePage;
  RoleDetails: RoleDetailsState;
  Permissions: PermissionOnePage;
  Analytics: AnalyticOnePage;
  AnalyticDetails: AnalyticDetailsState;
  Labs: LabOnePage;
  AnalyticsCourseCourse: AnalyticCourseOnePage;
}

export const reducers: ActionReducerMap<AppState, any> = {
  courses: CoursesPageReducer,
  CourseDetails: CourseDetailsReducer,
  ExperimentsSh: ShExperimentsReducer,
  Experiments: experimentPageReducer,
  Students: StudentPageReducer,
  Teachers: TeacherPageReducer,
  TeachersStudentss: TeacherStudentReducer,
  AllStudents: AllStudentsReducer,
  ExperimentDetails: ExperimentDetailsReducer,
  Grading: GradingReducer,
  AssignedExperiment: AssignedExperimentReducer,
  CompletedExperiment: CompletedExperimentReducer,
  Users: UsersPageReducer,
  UserDetails: UserDetailsReducer,
  Roles: RolesPageReducer,
  RoleDetails: RoleDetailsReducer,
  Permissions: PermissionsPageReducer,
  Analytics: AnalyticsPageReducer,
  AnalyticDetails: AnalyticDetailsReducer,
  Labs: LabsPageReducer,
  AnalyticsCourseCourse: AnalyticsCourseReducer,
};
