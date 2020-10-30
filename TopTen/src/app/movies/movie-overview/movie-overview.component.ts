import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrls: ['./movie-overview.component.css']
})
export class MovieOverviewComponent implements OnInit {

  movies = [];
  movie: any;
  selectedMovie;
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getMovies();

  }

  public getMovies() {
    return this.httpClient.get<any>('https://api.themoviedb.org/3/movie/top_rated?api_key=0b578984fcad327dcbf90ee3130faa4d&language=en-US&page=1').subscribe(
      response => {
        console.log(response);
        this.movies = response.results;
        this.getMovie("Professor Gabriel Emerson finally learns the truth about Julia Mitchell's identity, but his realization comes a moment too late. Julia is done waiting for the well-respected Dante specialist to remember her and wants nothing more to do with him. Can Gabriel win back her heart before she finds love in another's arms?");
        console.log(this.movies[0].image);
      }
    );
  }

  getMovie(movieImage) {
    this.selectedMovie = this.movies.find(x => x.overview === movieImage);
  }
}
