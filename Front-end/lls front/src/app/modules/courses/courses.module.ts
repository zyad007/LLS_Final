import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { AllExperimentComponent } from './pages/all-experiment/all-experiment.component';
import { AllStudentComponent } from './pages/all-student/all-student.component';
import { AllTeacherComponent } from './pages/all-teacher/all-teacher.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';
import { ExperimentsTableComponent } from './pages/experiments-table/experiments-table.component';
import { StudentsTableComponent } from './pages/students-table/students-table.component';
import { TeacherTableComponent } from './pages/teacher-table/teacher-table.component';

@NgModule({
  declarations: [
    CoursesComponent,
    // CreateCourseComponent
    CourseDetailsComponent,
    ExperimentsTableComponent,
    TeacherTableComponent,
    StudentsTableComponent,
    AllTeacherComponent,
    AllStudentComponent,
    EditCourseComponent,
    AllExperimentComponent,
  ],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
})
export class CoursesModule {}
