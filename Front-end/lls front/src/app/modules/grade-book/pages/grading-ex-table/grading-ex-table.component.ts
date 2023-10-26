import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { Experiment } from 'src/app/modules/courses/models/experiment';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';
import { ExperimentActions } from 'src/app/modules/courses/store/experiments/action/experiments-type';
import {
  selectExperimentCurrentPage,
  selectExperimentList,
  selectExperimentNumberOfPages,
} from 'src/app/modules/courses/store/experiments/selectors/experiments.selectors';

@Component({
  selector: 'app-grading-ex-table',
  templateUrl: './grading-ex-table.component.html',
  styleUrls: ['./grading-ex-table.component.scss'],
})
export class GradingExTableComponent implements OnInit {
  itemId!: string;
  experiments$!: Observable<Experiment[] | null>;
  ExperimentPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  isCheckBox: boolean = false;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public courseService: CoursesService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
      this.store.dispatch(
        ExperimentActions.loadExperimentPage({ id: params['id'] })
      );
      this.experiments$ = this.store.select(selectExperimentList(this.itemId));

      this.ExperimentPageNumber$ = this.store.select(
        selectExperimentNumberOfPages(this.itemId)
      );
      this.currentPageNumber$ = this.store.select(
        selectExperimentCurrentPage(this.itemId)
      );
    });
  }
  paginate(page: number, pages: number[]) {
    if (page < 1 || page > pages.length) return;
    this.store.dispatch(
      ExperimentActions.loadExperimentNext({
        pagination: page,
        id: this.itemId,
      })
    );
  }
}
