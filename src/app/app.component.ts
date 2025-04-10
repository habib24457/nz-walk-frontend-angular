import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/components/header/header.component';
import { RegionComponent } from './components/region/region/region.component';
import { WalkComponent } from './components/walk/walk/walk.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RegionComponent, WalkComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'nz-walks-frontend';
}
