import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { Trial } from '../../models/grade-book';

@Component({
  selector: 'app-trial-experiment',
  templateUrl: './trial-experiment.component.html',
  styleUrls: ['./trial-experiment.component.scss'],
})
export class TrialExperimentComponent implements OnInit {
  courseId: any;
  experimentId: any;
  gradeid: any;
  trials!: Trial[];

  constructor(private route: ActivatedRoute, private http: HttpService) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params['idd'];
      this.experimentId = params['expIdd'];
      this.gradeid = params['gradeBookId'];
      this.http
        .get(
          `/api/Course/${this.courseId}/Experiment/${this.experimentId}/Grade-Book/${this.gradeid}/Trial`
        )
        .subscribe((res) => {
          this.trials = res.data.results;
        });
    });
  }
}
