import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { LabRoutingModule } from './lab-routing.module';
import { LabComponent } from './pages/lab/lab.component';

@NgModule({
  declarations: [LabComponent],
  imports: [CommonModule, LabRoutingModule, SharedModule, ProgressBarModule],
})
export class LabModule {}
