import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startseite',
  standalone: true,
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.scss']
})
export class StartseiteComponent {
  constructor(private router: Router) {}

  navigateToWerkstatt() {
    this.router.navigate(['/werkstatt']);
  }
}
