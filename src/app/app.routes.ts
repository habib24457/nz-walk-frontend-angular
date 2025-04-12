import { Routes } from '@angular/router';
import { WalkComponent } from './components/walk/walk/walk.component';
import { RegionComponent } from './components/region/region/region.component';

export const routes: Routes = [
  { path: 'walks', component: WalkComponent },
  { path: 'regions', component: RegionComponent },
  { path: '', redirectTo: '/walks', pathMatch: 'full' },
  { path: '**', redirectTo: '/walks' },
];
