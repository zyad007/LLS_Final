import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { StudentService } from 'src/app/modules/student/services/student.service';
import { ExperimentDetailsGetResponse } from '../../models/experiment-details';
import { Experiment } from '../../models/show-experiment';
import { ExperimentDetailsActions } from '../../store/experiment-details/action/experiment-details-type';
import { selectExperimentDetailsContent } from '../../store/experiment-details/selectors/experiment-details.selectors';
import { ExperimentsActions } from '../../store/experiment/action/show-experiment-type';

@Component({
  selector: 'app-sh-ex-details',
  templateUrl: './sh-ex-details.component.html',
  styleUrls: ['./sh-ex-details.component.scss'],
})
export class ShExDetailsComponent implements OnInit {
  previewDisplay: boolean = false;
  sections: any;
  id: any;
  errorMessage!: string;
  ExperimentDetails$!: Observable<ExperimentDetailsGetResponse | null>;
  experiments$!: Observable<Experiment[] | null>;
  ExperimentPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private studentService: StudentService,
    private store: Store,
    private router: Router,
    public authServices: AuthService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.store.dispatch(
        ExperimentDetailsActions.loadExperimentDetail({ id: params['id'] })
      );
      this.ExperimentDetails$ = this.store.select(
        selectExperimentDetailsContent(this.id)
      );
    });
  }
  openPreview() {
    this.httpService.get(`/api/Experiment/${this.id}/LLO`).subscribe(
      (res) => {
        this.sections = this.studentService.parseForPreview(res.data.sections);
        this.previewDisplay = true;
      },
      (error) => {
        if (error.status === 400)
          this.errorMessage = 'No llo for this experiment yet ';
      }
    );
  }
  deletExperiment(ExperimentId: any) {
    this.store.dispatch(
      ExperimentsActions.deleteYourExperiment({ ExperimentId })
    );
    setTimeout(() => {
      this.router.navigate(['/user', 'show-ex']);
    }, 1000);
    // this.store.dispatch(ExperimentsActions.loadShExperiments());
  }
}
