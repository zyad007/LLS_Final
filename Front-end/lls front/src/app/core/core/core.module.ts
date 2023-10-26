import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AnalyticsCourseEffects } from 'src/app/modules/analytics/store/analytics-courses/effects/analytics-course.effects';
import { AnalyticDetailsEffects } from 'src/app/modules/analytics/store/analytics-ero/effects/analtics-ero.effects';
import { AnalyticsPageEffects } from 'src/app/modules/analytics/store/analytics/effects/analytics.effects';
import { AssignedExperimentEffects } from 'src/app/modules/assigned-experiment/store/assigned-ex/effects/assigned-experiment.effects';
import { CompletedExperimentEffects } from 'src/app/modules/completed-experiment/store/effects/completed-experiment.effects';
import { AllStudentsEffects } from 'src/app/modules/courses/store/all-students/effects/all-students.effects';
import { TeacherStudentEffects } from 'src/app/modules/courses/store/all-teacher-student/effects/teacher-student.effects';
import { CourseDetailsEffects } from 'src/app/modules/courses/store/course-details/effects/course-details.effects';
import { CoursesPageEffects } from 'src/app/modules/courses/store/courses/effects/courses.effects';
import { ExperimentPageEffects } from 'src/app/modules/courses/store/experiments/effects/experiments.effects';
import { StudentPageEffects } from 'src/app/modules/courses/store/students/effects/students.effects';
import { TeacherPageEffects } from 'src/app/modules/courses/store/teachers/effects/teachers.effects';
import { GradingPageEffects } from 'src/app/modules/grade-book/store/grading/effects/grade-book.effects';
import { LabsPageEffects } from 'src/app/modules/lab/store/labs/effects/lab.effects';
import { PermissionsPageEffects } from 'src/app/modules/roles/store/permissions/effects/permissions.effects';
import { RoleDetailsEffects } from 'src/app/modules/roles/store/role-details/effects/role-details.effects';
import { RolesPageEffects } from 'src/app/modules/roles/store/roles/effects/roles.effects';
import { UserDetailsEffects } from 'src/app/modules/roles/store/user-details/effects/user-details.effects';
import { UsersPageEffects } from 'src/app/modules/roles/store/users/effects/users.effects';
import { ExperimentDetailsEffects } from 'src/app/modules/show-experiment/store/experiment-details/effects/experiment-details.effects';
import { ShExperimentsEffects } from 'src/app/modules/show-experiment/store/experiment/effects/show-experiment.effects';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { reducers } from 'src/app/store/state';
import { environment } from 'src/environments/environment';
import { LoaderComponent } from '../components/loader/loader.component';
import { FooterComponent } from '../components/main-layout/footer/footer.component';
import { HeaderComponent } from '../components/main-layout/header/header.component';
import { LayoutComponent } from '../components/main-layout/layout/layout.component';

@NgModule({
  declarations: [
    LoaderComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      ShExperimentsEffects,
      CoursesPageEffects,
      CourseDetailsEffects,
      ExperimentPageEffects,
      StudentPageEffects,
      TeacherPageEffects,
      TeacherStudentEffects,
      AllStudentsEffects,
      ExperimentDetailsEffects,
      GradingPageEffects,
      AssignedExperimentEffects,
      CompletedExperimentEffects,
      UsersPageEffects,
      UserDetailsEffects,
      RolesPageEffects,
      RoleDetailsEffects,
      PermissionsPageEffects,
      AnalyticsPageEffects,
      AnalyticsCourseEffects,
      AnalyticDetailsEffects,
      LabsPageEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  exports: [LoaderComponent],
})
export class CoreModule {}
