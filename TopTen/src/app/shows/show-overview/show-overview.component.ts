import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-overview',
  templateUrl: './show-overview.component.html',
  styleUrls: ['./show-overview.component.css']
})

export class ShowOverviewComponent implements OnInit {

  shows = [];
  show: any;
  selectedShow;
  id: any;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getShows();

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  getShows(){
    this.httpClient
    .get<any>('https://api.themoviedb.org/3/tv/top_rated?api_key=0b578984fcad327dcbf90ee3130faa4d&language=en-US&page=1')
    .subscribe(
      response => {
        console.log(response);
        this.shows = response.results.map(show => { return {
          id: show.id,
          title: show.name,
          image: 'https://image.tmdb.org/t/p/w185' + show.poster_path,
          overview: show.overview};
        });
        this.getShow();
        console.log(this.shows[0].image);
      }
    );
  }

  getShow() {
    this.selectedShow = this.shows.find(x => x.id.toString() === this.id);
  }

  goBack(){
    window.history.back();
  }
}
