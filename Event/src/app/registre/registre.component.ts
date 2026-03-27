
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-registre',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './registre.component.html',
  styleUrl: './registre.component.css'
})
export class RegistreComponent {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  roles: string; 

  constructor(private eventService: EventService, private router: Router) {
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.password = '';
    this.roles = 'participant'; 
  }

  onRegister() {
    const userData = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      roles: this.roles 
    };

    this.eventService.register(userData).subscribe({
      next: (res) => {
        alert('Compte créé avec succès !');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur inscription', err);
      }
    });
  }
}