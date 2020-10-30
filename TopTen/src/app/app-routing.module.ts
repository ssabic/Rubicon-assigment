import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieOverviewComponent } from './movies/movie-overview/movie-overview.component';
import { MoviesComponent } from './movies/movies.component';
import { ShowOverviewComponent } from './shows/show-overview/show-overview.component';
import { ShowsComponent } from './shows/shows.component';


const routes: Routes = [
  { path: '', redirectTo: '/shows', pathMatch: 'full' },
  { path: 'shows', component: ShowsComponent },
  { path: 'movies', component: MoviesComponent, pathMatch: 'full' },
  { path: 'movies/overview', component: MovieOverviewComponent, pathMatch: 'full' },
  { path: 'shows/overview', component: ShowOverviewComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MoviesComponent, ShowsComponent, MovieOverviewComponent, ShowOverviewComponent];
