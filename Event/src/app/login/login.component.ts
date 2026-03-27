
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private eventService: EventService, private router: Router) {
    this.email = '';
    this.password = '';
  }

  onLogin() {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.eventService.login(userData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        alert('Connexion réussie !');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erreur login', err);
        alert('Email ou mot de passe incorrect');
      }
    });
  }
}