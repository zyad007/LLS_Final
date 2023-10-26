import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  data: any;
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    public authServices: AuthService
  ) {}

  ngOnInit(): void {
    this.data = this.localStorage.getLocal('Permissions');
  }

  logOut() {
    this.localStorage.removeAllLocals();
    // this.router.navigate(['/']);
    window.location.href = '/';
  }
}
