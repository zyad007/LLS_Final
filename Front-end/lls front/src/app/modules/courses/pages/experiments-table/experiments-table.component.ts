import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ClipboardService } from 'ngx-clipboard';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { ExperimentsActions } from 'src/app/modules/show-experiment/store/experiment/action/show-experiment-type';
import { environment } from 'src/environments/environment';
import { Experiment } from '../../models/experiment';
import { CoursesService } from '../../services/courses.service';
import { ExperimentActions } from '../../store/experiments/action/experiments-type';
import {
  selectExperimentCurrentPage,
  selectExperimentList,
  selectExperimentNumberOfPages,
} from '../../store/experiments/selectors/experiments.selectors';

@Component({
  selector: 'app-experiments-table',
  templateUrl: './experiments-table.component.html',
  styleUrls: ['./experiments-table.component.scss'],
  providers: [MessageService],
})
export class ExperimentsTableComponent implements OnInit {
  itemId!: string;
  // experiments$!: Observable<Experiment[] | null>;
  experiments$!: Experiment[];
  ExperimentPageNumber$!: Observable<number[]>;
  currentPageNumber$!: Observable<number>;
  isCheckBox: boolean = false;
  next!: any;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public courseService: CoursesService,
    private clipboardService: ClipboardService,
    private messageService: MessageService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
      // this.store.dispatch(
      //   ExperimentActions.loadExperimentPage({ id: params['id'] })
      // );
      // this.experiments$ = this.store.select(selectExperimentList(this.itemId));

      // this.ExperimentPageNumber$ = this.store.select(
      //   selectExperimentNumberOfPages(this.itemId)
      // );
      // this.currentPageNumber$ = this.store.select(
      //   selectExperimentCurrentPage(this.itemId)
      // );
      this.http.get(`/api/Course/${this.itemId}/Experiment`).subscribe({
        next: (res) => {
          console.log(res);
          this.experiments$ = res.data.result;
          if (res.data?.next) {
            this.next = res.data?.next;
            console.log(this.next);
          }
        },
        error: (any) => {},
      });
    });
  }
  searchByName(searchText: string) {
    this.http
      .get(`/api/Course/${this.itemId}/?searchByExperimentName=${searchText}`)
      .subscribe({
        next: (res) => {
          this.experiments$ = res.data;
          if (res.data?.next) {
            this.next = res.data?.next;
          }
        },
        error: (any) => {},
      });
  }
  paginate() {
    if (this.next) {
      this.http.getNext(this.next).subscribe({
        next: (res) => {
          this.experiments$ = res.data;
          this.next = res.data.next;
        },
        error: (any) => {},
      });
    }
  }
  // paginate(page: number, pages: number[]) {
  //   if (page < 1 || page > pages.length) return;
  //   this.store.dispatch(
  //     ExperimentActions.loadExperimentNext({
  //       pagination: page,
  //       id: this.itemId,
  //     })
  //   );
  // }
  deletExperiment(ExperimentId: any) {
    this.store.dispatch(
      ExperimentsActions.deleteYourExperiment({ ExperimentId })
    );
    this.http.get(`/api/Course/${this.itemId}/Experiment`).subscribe({
      next: (res) => {
        console.log(res);
        this.experiments$ = res.data.result;
        if (res.data?.next) {
          this.next = res.data?.next;
          console.log(this.next);
        }
      },
      error: (any) => {},
    });
    // this.store.dispatch(ExperimentsActions.loadShExperiments());
  }
  assignExperiment() {
    this.courseService.isAssignExperiment = true;
  }
  copyLink(id: string) {
    this.clipboardService.copyFromContent(
     'https://charming-jones.74-50-88-98.plesk.page'+ '/user/show-ex/sh-details/' + id
    );
    this.showInfo('Experiment copied successfully', 'success');
  }
  showInfo(messageEn: string, type: any) {
    let message = messageEn;
    this.messageService.add({
      severity: type,
      summary: type,
      detail: message,
      key: 'check',
    });
  }
  // assignExperiment(userId: string) {
  //   this.store.dispatch(
  //     ExperimentActions.sumbitExperiment({ courseId: this.itemId, userId })
  //   );
  // }
  // addExperiment() {
  //   this.isCheckBox = true;
  // }
}
