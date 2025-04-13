import { Routes } from '@angular/router';
import { WalkComponent } from './components/walk/walk/walk.component';
import { RegionComponent } from './components/region/region/region.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'walks', component: WalkComponent }, // Child route for WalkComponent
      { path: 'regions', component: RegionComponent }, // Child route for RegionComponent
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route
];
