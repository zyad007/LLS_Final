import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';

const routes: Routes = [
  { path: '', component: CoursesComponent, title: 'courses' },
  { path: 'create-course', component: CreateCourseComponent, title: 'courses' },
  {
    path: 'details/:id',
    component: CourseDetailsComponent,
    title: 'courses Details',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
