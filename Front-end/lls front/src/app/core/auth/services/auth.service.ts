import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin: boolean = false;
  public Permissions: any;
  public Users: any;
  errorMessage!: string;
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.Permissions = this.localStorage.getLocal('Permissions');
    this.Users = this.localStorage.getLocal('Users');
  }
  // Post method
  postRequest(url: string, body: {}): Observable<any> {
    return this.http.post<any>(environment.baseUrl + url, body);
  }
  Login(body: {}) {
    this.postRequest('/api/Account/Login', body).subscribe({
      next: (res: any) => {
        this.localStorage.setLocal('token', res.data.token);
        if (res) {
          this.isLogin = true;
          this.localStorage.setLocal('Permissions', res.data.permissions);
          this.localStorage.setLocal('Users', res.data);
          this.Permissions = this.localStorage.getLocal('Permissions');
          this.Users = this.localStorage.getLocal('Users');
          setTimeout(() => {
            this.router.navigate(['/user']);
          }, 1000);
        }
      },
      error: (error: any) => {
        if (error) {
          this.errorMessage = 'Email or Password is incorrect';
        }
      },
    });
  }
  searchStringInArray(str: string, strArray: string[]): boolean {
    for (var j = 0; j < strArray.length; j++) {
      if (strArray[j].includes(str)) return true;
    }
    return false;
  }
}

// 0
// :
// "AddDeleteEdit_User"
// 1
// :
// "AddDeleteEdit_Course"
// 2
// :
// "AddDeleteEdit_Exp"
// 3
// :
// "AddDeleteEdit_Role"
// 4
// :
// "ViewCourses"
// 5
// :
// "ViewRoles"
// 6
// :
// "ViewExp"
// 7
// :
// "ViewUsers"
// 8
// :
// "AssignExpToCourse"
// 9
// :
// "AssignUserToCourse"
// 10
// :
// "AssignRoleToUser"
// 11
// :
// "SubmitAssignedExp_Student"
// 12
// :
// "ViewAssignedExpCourse_Student"
// 13
// :
// "GradeStudentAnswers_Teacher"
// 14
// :
// "ViewAnalytics_Teacher"
// 15
// :
// "ViewGradeBooks_Teacher"
// 16
// :
// "ViewActiveLab_Teacher"
