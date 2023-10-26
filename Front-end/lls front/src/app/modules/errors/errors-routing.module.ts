import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error403Component } from './pages/error403/error403.component';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';

const routes: Routes = [
  { path: '404', component: Error404Component, title: 'Page Not Found' },
  { path: '403', component: Error403Component, title: 'Page Forbiden' },
  { path: '500', component: Error500Component, title: 'Server Error' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorsRoutingModule {}
