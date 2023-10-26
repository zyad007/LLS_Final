import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { CourseDetailsGetResponse } from '../../models/courses-details';
import { Experiment } from '../../models/experiment';
import { CoursesService } from '../../services/courses.service';
import { CourseDetailsActions } from '../../store/course-details/action/course-details-type';
import { selectCourseDetailsContent } from '../../store/course-details/selectors/course-details.selectors';
import { CoursesPageActions } from '../../store/courses/action/course-type';
import { ExperimentActions } from '../../store/experiments/action/experiments-type';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
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
    private router: Router,
    public authServices: AuthService
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
  paginate(page: number, pages: number[]) {
    if (page < 1 || page > pages.length) return;
    this.store.dispatch(
      ExperimentActions.loadExperimentNext({
        pagination: page,
        id: this.id,
      })
    );
  }
  isExperiment() {
    this.courseService.isExperiment = true;
    this.courseService.isTeacher = false;
    this.courseService.isStudent = false;
  }
  isTeacher() {
    this.courseService.isTeacher = true;
    this.courseService.isExperiment = false;
    this.courseService.isStudent = false;
  }
  isStudent() {
    this.courseService.isStudent = true;
    this.courseService.isExperiment = false;
    this.courseService.isTeacher = false;
  }
  deletCourse(CourseId: any) {
    this.store.dispatch(CoursesPageActions.deleteYourCourse({ CourseId }));
    setTimeout(() => {
      this.router.navigate(['/user', 'courses']);
    }, 1000);
  }
}
