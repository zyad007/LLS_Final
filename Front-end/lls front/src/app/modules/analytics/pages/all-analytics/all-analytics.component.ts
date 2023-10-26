import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-all-analytics',
  templateUrl: './all-analytics.component.html',
  styleUrls: ['./all-analytics.component.scss'],
})
export class AllAnalyticsComponent implements OnInit {
  constructor(public analyticsServices: AnalyticsService) {}

  ngOnInit(): void {}
  isExperiment() {
    this.analyticsServices.isExperiment = true;
    this.analyticsServices.isCourse = false;
  }
  isCourse() {
    this.analyticsServices.isExperiment = false;
    this.analyticsServices.isCourse = true;
  }
}
