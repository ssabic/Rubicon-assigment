import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MovieOverviewComponent } from './movies/movie-overview/movie-overview.component';
import { MoviesComponent } from './movies/movies.component';
import { SearchService } from './search.service';
import { SearchDataService } from './search/search-data.service';
import { SearchComponent } from './search/search.component';
import { ShowOverviewComponent } from './shows/show-overview/show-overview.component';
import { ShowsComponent } from './shows/shows.component';



// ];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    routingComponents,
    MovieOverviewComponent,
    ShowOverviewComponent,
    ShowsComponent,
    MoviesComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
    // RouterModule.forRoot(appRoutes, {
    //   scrollPositionRestoration: 'top',
    //   anchorScrolling: 'enabled'
    // }),
  ],
  providers: [SearchDataService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
