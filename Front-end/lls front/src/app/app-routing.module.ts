import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/main-layout/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: '',
      //   loadChildren: () =>
      //     import('./modules/home/home.module').then((m) => m.HomeModule),
      // },
      {
        path: '',
        loadChildren: () =>
          import('./core/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'auth-tool/:id',
        loadChildren: () =>
          import('./modules/auth-tool/auth-tool.module').then(
            (m) => m.AuthToolModule
          ),
      },

      {
        path: 'student',
        loadChildren: () =>
          import('./modules/student/student.module').then(
            (m) => m.StudentModule
          ),
      },
    ],
  },

  {
    path: 'errors',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/errors/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
