import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthToolComponent } from './pages/auth-tool/auth-tool.component';

const routes: Routes = [
  { path: '', component: AuthToolComponent, title: 'AuthTool' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthToolRoutingModule {}
