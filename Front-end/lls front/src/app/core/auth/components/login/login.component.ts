import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public loginService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  get formControls() {
    return this.loginForm.controls;
  }
  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  sendData() {
    this.loginService.Login(this.loginForm.value);
    this.loginForm.reset();
  }
}
