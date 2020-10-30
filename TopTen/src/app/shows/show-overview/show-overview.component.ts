import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
  selector: 'app-show-overview',
  templateUrl: './show-overview.component.html',
  styleUrls: ['./show-overview.component.css']
})
export class ShowOverviewComponent implements OnInit {

  shows: any;
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getShows();
  }

  getShows(){
    this.httpClient.get<any>('https://api.themoviedb.org/3/tv/top_rated?api_key=0b578984fcad327dcbf90ee3130faa4d&language=en-US&page=1').subscribe(
      response => {
        console.log(response);
        this.shows = response.results.map(show => { return {title: show.name,
                                                             image: "https://image.tmdb.org/t/p/w185" + show.poster_path,
                                                            overview: show.overview}})
        console.log(this.shows[0].image) 
      }
    );
  }
}
