import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { CourseDetailsGetResponse } from 'src/app/modules/courses/models/courses-details';
import { Experiment } from 'src/app/modules/courses/models/experiment';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';
import { CourseDetailsActions } from 'src/app/modules/courses/store/course-details/action/course-details-type';
import { selectCourseDetailsContent } from 'src/app/modules/courses/store/course-details/selectors/course-details.selectors';

@Component({
  selector: 'app-grading-details',
  templateUrl: './grading-details.component.html',
  styleUrls: ['./grading-details.component.scss'],
})
export class GradingDetailsComponent implements OnInit {
  CourseDetails$!: Observable<CourseDetailsGetResponse | null>;
  experiments$!: Observable<Experiment[] | null>;
  id!: string;
  ExperimentPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private httpService: HttpService,
    public courseService: CoursesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.store.dispatch(
        CourseDetailsActions.loadCourseDetail({ id: params['id'] })
      );
      this.CourseDetails$ = this.store.select(
        selectCourseDetailsContent(this.id)
      );
    });
  }
}
