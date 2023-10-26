import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    title: 'User',
    children: [
      {
        path: 'courses',
        loadChildren: () =>
          import('../courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'analytics',
        loadChildren: () =>
          import('../analytics/analytics.module').then(
            (m) => m.AnalyticsModule
          ),
      },
      {
        path: 'assigned-experiment',
        loadChildren: () =>
          import('../assigned-experiment/assigned-experiment.module').then(
            (m) => m.AssignedExperimentModule
          ),
      },
      {
        path: 'completed-experiment',
        loadChildren: () =>
          import('../completed-experiment/completed-experiment.module').then(
            (m) => m.CompletedExperimentModule
          ),
      },
      {
        path: 'show-ex',
        loadChildren: () =>
          import('../show-experiment/show-experiment.module').then(
            (m) => m.ShowExperimentModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../roles/roles.module').then((m) => m.RolesModule),
      },
      {
        path: 'lab',
        loadChildren: () =>
          import('../lab/lab.module').then((m) => m.LabModule),
      },
      {
        path: 'grade-book',
        loadChildren: () =>
          import('../grade-book/grade-book.module').then(
            (m) => m.GradeBookModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
