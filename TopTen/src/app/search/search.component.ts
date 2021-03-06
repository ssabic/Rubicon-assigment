import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { catchError, debounceTime, map, mergeMap } from 'rxjs/operators';

import { SearchService } from '../search.service';
import { SearchDataService } from './search-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private searchService: SearchService,
              private searchDataService: SearchDataService,
              private router: Router) {
                router.events.subscribe(e => {
                  if (e instanceof NavigationEnd){
                    console.log(e);
                    this.newSearch();
                  }
                });
              }

  public loading: boolean;
  public isMovies: boolean;
  public searchTerm = new Subject<string>();
  public searchResults: any;
  public paginationElements: any;
  public errorMessage: any;

  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required),

  });

  public newSearch(){
    const term = this.searchForm.get('search').value;
    let request;
    if (this.router.url.includes('movies') && term.length > 2) {
      request = this.searchService.searchMovieEntries(term);
    } else if (this.router.url.includes('shows') && term.length > 2){
      request =  this.searchService.searchShowsEntries(term);
    }

    if (request)
    {
      request.subscribe(res => this.paginationElements = res.results.map(movie => {
      return {
        id: movie.id,
        title: movie.title || movie.name,
        image: 'https://image.tmdb.org/t/p/w185' + movie.poster_path,
        overview: movie.overview
      };
    }));
  }
  }

  public search() {
    this.searchTerm.pipe(
      map((e: any) => {
        console.log(e.target.value);
        this.searchDataService.setFilter(e.target.value);
        return e.target.value;
      }),
      debounceTime(1000),
      mergeMap(term => {
        this.loading = true;
        if (this.router.url.includes('movies') && term.length > 2) {
          return this.searchService.searchMovieEntries(term);
        } else if (this.router.url.includes('shows') && term.length > 2){
          return this.searchService.searchShowsEntries(term);
        }
      }),
      catchError((e) => {
        console.log(e);
        this.loading = false;
        this.errorMessage = e.message;
        return throwError(e);
      })

    ).subscribe(v => {
      this.loading = false;
      this.searchResults = v;
      this.paginationElements = this.searchResults.results.map(movie => {
        return {
          id: movie.id,
          title: movie.title || movie.name,
          image: 'https://image.tmdb.org/t/p/w185' + movie.poster_path,
          overview: movie.overview
        };
      });
      if (this.router.url.includes('movie')) {
        this.searchDataService.movieList = this.searchResults.results;
      } else if (this.router.url.includes('show')) {
        this.searchDataService.tvShowList = this.searchResults.results;
      }
    });
  }



  redirect(title) {
    window.location.href = 'movies/overview/' + title;
  }

  ngOnInit(): void {
    this.search();
    console.log('aaaaaa');
  }
  }
