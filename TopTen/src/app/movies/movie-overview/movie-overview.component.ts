import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrls: ['./movie-overview.component.css']
})
export class MovieOverviewComponent implements OnInit {

  movies = [];
  movie: any;
  selectedMovie;
  id: any;
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  public getMovies() {
    return this.httpClient.get<any>('https://api.themoviedb.org/3/movie/top_rated?api_key=0b578984fcad327dcbf90ee3130faa4d&language=en-US&page=1').subscribe(
      response => {
        console.log(response);
        this.movies = response.results.map(movie => {
          return {
            id: movie.id,
            title: movie.title,
            image: 'https://image.tmdb.org/t/p/w185' + movie.poster_path,
            overview: movie.overview
          };
        });
        this.getMovie();
        console.log(this.movies[0].image);
      }
    );
  }

  getMovie() {
    this.selectedMovie = this.movies.find(x => x.id.toString() === this.id);
  }

  goBack(){
    window.history.back();
  }
}
