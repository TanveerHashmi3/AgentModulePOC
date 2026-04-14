import { Component, OnInit, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  captchaCode: string = '';
  private generatedCaptcha: string = '';
  private isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Optional() private msalService: MsalService | null,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.generateCaptcha();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]]
    });
  }

  generateCaptcha(): void {
    // Generate a random 6-character alphanumeric captcha code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.generatedCaptcha = '';
    for (let i = 0; i < 6; i++) {
      this.generatedCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.captchaCode = this.generatedCaptcha;
    // Reset the captcha input field
    this.loginForm.patchValue({ recaptcha: '' });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const userEnteredCaptcha = formData.recaptcha.toUpperCase();
      
      // Verify captcha
      if (userEnteredCaptcha !== this.generatedCaptcha) {
        this.loginForm.get('recaptcha')?.setErrors({ 'pattern': true });
        console.log('Captcha verification failed');
        return;
      }
      
      console.log('Login Form Data JSON:', JSON.stringify({
        username: formData.username,
        password: '[REDACTED]',
        captchaVerified: true
      }, null, 2));
      
      // Trigger MSAL login only in browser
      if (this.isBrowser && this.msalService) {
        this.msalService.loginRedirect();
      } else {
        console.log('MSAL not available in current environment');
      }
    } else {
      console.log('Form is invalid');
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get recaptcha() {
    return this.loginForm.get('recaptcha');
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
