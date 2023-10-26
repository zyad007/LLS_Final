import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ShowExperimentService } from '../../services/show-experiment.service';
import { ExperimentsActions } from '../../store/experiment/action/show-experiment-type';

@Component({
  selector: 'app-import-experiment',
  templateUrl: './import-experiment.component.html',
  styleUrls: ['./import-experiment.component.scss'],
})
export class ImportExperimentComponent implements OnInit {
  errorMessge = false;
  constructor(
    private http: HttpService,
    private store: Store,
    private exService: ShowExperimentService,
    public authServices: AuthService
  ) {}

  ngOnInit(): void {}
  uploadFile(event: any) {
    let formdata = new FormData();
    formdata.append('lloFile', event.files[0]);
    this.http.postRequest('/api/Experiment/Import', formdata).subscribe({
      next: (res: any) => {
        this.store.dispatch(ExperimentsActions.loadShExperiments());
        this.exService.importDisplay = false;
      },
      error: (err) => {
        this.errorMessge = true;
      },
    });
  }
}
