import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ɵROUTER_PROVIDERS } from '@angular/router';

import { SearchDataService } from '../search/search-data.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
  providers: [ɵROUTER_PROVIDERS]
})

export class ShowsComponent implements OnInit {
  shows: any;
  selectedShow: any;

  constructor(
    private httpClient: HttpClient,
    private searchDataService: SearchDataService
  ) { }

  ngOnInit(): void {
    this.getShows();
  }

  getShows(){
    this.httpClient
    .get<any>('https://api.themoviedb.org/3/tv/top_rated?api_key=0b578984fcad327dcbf90ee3130faa4d&language=en-US&page=1')
    .subscribe(
      response => {
        console.log(response);
        this.searchDataService.tvShowList = response.results.map(show => { return {
          id: show.id,
          title: show.name,
          image: 'https://image.tmdb.org/t/p/w185' + show.poster_path,
          overview: show.overview
        };
      });

        this.shows = this.searchDataService.tvShowList;
    }
  );
  }

  redirect(title) {
    window.location.href = 'shows/overview/' + title;

  }

}
