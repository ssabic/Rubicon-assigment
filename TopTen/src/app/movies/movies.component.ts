import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ɵROUTER_PROVIDERS } from '@angular/router';

import { SearchDataService } from '../search/search-data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [ɵROUTER_PROVIDERS]
})

export class MoviesComponent implements OnInit {
  movies: any;
  selectedMovie: any;
  constructor(
    private httpClient: HttpClient,
    private searchDataService: SearchDataService
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.httpClient.get<any>('https://api.themoviedb.org/3/movie/top_rated?api_key=0b578984fcad327dcbf90ee3130faa4d&language=en-US&page=1')
    .subscribe(
      response => {
        console.log(response);
        this.searchDataService.movieList = response.results.map(movie => {
          return {
            id: movie.id,
            title: movie.title,
            image: 'https://image.tmdb.org/t/p/w185' + movie.poster_path,
            overview: movie.overview
          };
        });
        this.movies = this.searchDataService.movieList;
      }
    );
  }

  redirect(title) {
    window.location.href = 'movies/overview/' + title;
  }
}
