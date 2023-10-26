import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CreateCourseComponent } from '../courses/pages/create-course/create-course.component';
import { GradeBookComponent } from '../grade-book/pages/grade-book/grade-book.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersComponent,
    // CoursesComponent,
    CreateCourseComponent,
    // AnalyticsComponent,
    // RolesComponent,
    // LabComponent,
    // ShowExperimentComponent,
    GradeBookComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
