import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import {
  AssignedExperiment,
  AssignedExperimentDetails,
} from '../../models/assigned-experiment';

@Component({
  selector: 'app-assigned-experiment-details',
  templateUrl: './assigned-experiment-details.component.html',
  styleUrls: ['./assigned-experiment-details.component.scss'],
})
export class AssignedExperimentDetailsComponent implements OnInit {
  @Input('item') item!: AssignedExperiment;
  data!: AssignedExperimentDetails;
  id: any;
  weekDays: any[] = [];
  time: any[] = [];
  curentDay: any;
  constructor(
    public authServices: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['idd'];
      this.http.getRequest(`/api/Student/Assigned/${this.id}`).subscribe({
        next: (res: any) => {
          this.data = res.data;
          if (this.data) this.getDatesInRange();
        },
        error: (error: any) => {},
      });
    });
  }

  selectDay(date: any) {
    let day = date;
    this.curentDay = day;
    this.http
      .postRequest(`/api/Student/Assigned/${this.id}/Get-Time-Slot`, {
        day,
      })
      .subscribe((res: any) => {
        this.time = res.data;
      });
  }
  selectTime(slot: any) {
    let slotId = slot;
    this.http
      .postRequest(`/api/Student/Assigned/${this.id}/Time-Slot`, {
        slotId,
        day: this.curentDay,
      })
      .subscribe((res: any) => {
        // this.time = res.data;
        this.router.navigate(['/user/assigned-experiment']);
      });
  }
  getDatesInRange() {
    let startDate = new Date(this.data.startDate);
    let endDate = new Date(this.data.endDate);
    const date = new Date(startDate.getTime());
    while (date <= endDate) {
      this.weekDays.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return this.weekDays;
  }
}
