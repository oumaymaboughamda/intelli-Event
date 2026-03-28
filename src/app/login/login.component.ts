import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // ✅ تأكد من وجود HttpClientModule
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule // http
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    
    if (this.loginForm.invalid) {
      this.message = "Remplir tous les champs correctement";
      return;
    }

    this.http.post<any>('http://localhost:3000/login', this.loginForm.value)
      .subscribe({
        next: (res) => {
          // 
                  if (res && res.token) {
            localStorage.setItem('token', res.token);
            if (res.user) {
              localStorage.setItem('user', JSON.stringify(res.user));
            }

            this.message = `Bienvenue ${res.user?.nom || ''}`; 
            setTimeout(() => {
              this.router.navigate(['/profil']);
            }, 500);

          } else {
            this.message = "Connexion échouée: Token missing";
          }
        },
        error: (err) => {
          console.error("Login Error:", err);
          this.message = "Email ou mot de passe incorrect";
        }
      });
  }
}