import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  _fb = inject(FormBuilder);
  _authService = inject(AuthService);
  _router = inject(Router);
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this._authService.login(email, password);
    this._router.navigate(['/']);
  }
}
