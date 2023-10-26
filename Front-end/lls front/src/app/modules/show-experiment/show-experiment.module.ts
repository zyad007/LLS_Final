import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FileUploadModule } from 'primeng/fileupload';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CreateExperimentComponent } from './pages/create-experiment/create-experiment.component';
import { EditExperimentComponent } from './pages/edit-experiment/edit-experiment.component';
import { ImportExperimentComponent } from './pages/import-experiment/import-experiment.component';
import { ShExDetailsComponent } from './pages/sh-ex-details/sh-ex-details.component';
import { ShowExperimentComponent } from './pages/show-experiment/show-experiment.component';
import { ShowExperimentRoutingModule } from './show-experiment-routing.module';

@NgModule({
  declarations: [
    ShExDetailsComponent,
    EditExperimentComponent,
    ShowExperimentComponent,
    CreateExperimentComponent,
    ImportExperimentComponent,
  ],
  imports: [
    CommonModule,
    ShowExperimentRoutingModule,
    SharedModule,
    FileUploadModule,
  ],
})
export class ShowExperimentModule {}
