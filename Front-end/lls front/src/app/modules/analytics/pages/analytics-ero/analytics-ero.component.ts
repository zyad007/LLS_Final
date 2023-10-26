import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { AnalyticDetailsGetResponse } from '../../models/analytics-ero';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-analytics-ero',
  templateUrl: './analytics-ero.component.html',
  styleUrls: ['./analytics-ero.component.scss'],
})
export class AnalyticsEroComponent implements OnInit {
  AnalyticDetails$!: Observable<AnalyticDetailsGetResponse | null>;
  id!: string;

  numberOfColumns: any[] = [1, 2, 3];
  layout: any[] = ['Vertical', 'Horizontal'];
  currentSectionNumber: number = 0;
  display: boolean = false;
  success: boolean = false;
  emptyScore: boolean = false;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private http: HttpService,
    public AnalyticService: AnalyticsService,
    private router: Router,
    public analyticsService: AnalyticsService,
    private sanitizer: DomSanitizer,
    public authServices: AuthService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      // this.store.dispatch(
      //   AnalyticDetailsActions.loadAnalyticDetail({ id: params['id'] })
      // );
      // this.AnalyticDetails$ = this.store.select(
      //   selectAnalyticDetailsContent(this.id)
      // );
      // /api/Analytics/Experiment/ERO
      this.http
        .get(`/api/Analytics/Experiment/ERO/?expIdd=${this.id}`)
        .subscribe((res) => {
          console.log(res.sections);
          this.analyticsService.setSections(res.sections);
          // this.AnalyticDetails$ = res;
        });
    });
  }

  getNumberOfColumns(columns: number) {
    let arr: any[] = [];
    for (let i = 1; i <= columns; i++) arr.push(i);
    return arr;
  }
  nextSection() {
    if (this.currentSectionNumber >= this.analyticsService.sections.length - 1)
      return;
    this.currentSectionNumber += 1;
  }
  previousSection() {
    if (this.currentSectionNumber <= 0) return;
    this.currentSectionNumber -= 1;
  }
  sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
