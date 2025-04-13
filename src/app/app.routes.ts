import { Routes } from '@angular/router';
import { WalkComponent } from './components/walk/walk/walk.component';
import { RegionComponent } from './components/region/region/region.component';
import { HomeComponent } from './components/home/home.component';
import { RecentWalksComponent } from './components/recent-walks/recent-walks.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'recentWalk', component: RecentWalksComponent },
      { path: 'walks', component: WalkComponent },
      { path: 'regions', component: RegionComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
