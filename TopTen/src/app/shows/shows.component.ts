import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { SearchDataService } from '../search/search-data.service';

export class Show{
  constructor(
    public poster_path: string,
    public popularity: number,
    public id: number,
    public backdrop_path: string,
    public vote_average: number,
    public overview: string,
    public first_air_date: string,
    public origin_country: Array<string>,
    public genre_ids: Array<number>,
    public original_language: string,
    public vote_count: number,
    public name: String,
    public original_name: string
  ){}
}
@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  shows: any;
  
  constructor(
    private httpClient: HttpClient,
    private searchDataService: SearchDataService
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(){
    this.httpClient.get<any>('https://api.themoviedb.org/3/tv/top_rated?api_key=0b578984fcad327dcbf90ee3130faa4d&language=en-US&page=1').subscribe(
      response => {
        console.log(response);
        this.searchDataService.tvShowList = response.results.map(show => { return {title: show.name,
                                                             image: "https://image.tmdb.org/t/p/w185" + show.poster_path}});
        
     this.shows = this.searchDataService.tvShowList;
      });
  }

}
