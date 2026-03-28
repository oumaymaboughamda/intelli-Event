import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-inscri',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule 
  ],
  templateUrl: './inscri.component.html',
  styleUrls: ['./inscri.component.css']
})
export class InscriComponent {
  registerForm: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue] // ajouter le chekbox en validation
    });
  }

  register() {
    
    if (this.registerForm.invalid) {
      this.message = "Veuillez remplir tous les champs correctement";
      console.log("Form Invalid:", this.registerForm.value);
      return;
    }

    const formData = this.registerForm.value;

    if (formData.password !== formData.confirmPassword) {
      this.message = "Les mots de passe ne correspondent pas";
      return;
    }

    this.http.post<any>('http://localhost:3000/inscri', formData)
      .subscribe({
        next: (res) => {
          this.message = "Inscription réussie !";
          if (res.user) localStorage.setItem('user', JSON.stringify(res.user));
          if (res.token) localStorage.setItem('token', res.token);
          
          setTimeout(() => this.router.navigate(['/profil']), 1500);
        },
        error: (err) => {
          this.message = err.error?.message || "Erreur de connexion au serveur";
        }
      });
  }
}