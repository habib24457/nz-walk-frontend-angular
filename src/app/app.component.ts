import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root', //unique identifier for the component
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'nz-walks-frontend';
}
