import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Import Router

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
