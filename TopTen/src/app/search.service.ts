import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {

    constructor(private httpClient: HttpClient) { }

    public baseMovieUrl = 'https://api.themoviedb.org/3/search/movie?api_key=0b578984fcad327dcbf90ee3130faa4d&language=en-US&page=1&include_adult=false';
    public baseShowsUrl = 'https://api.themoviedb.org/3/search/tv?api_key=0b578984fcad327dcbf90ee3130faa4d&language=en-US&page=1&include_adult=false';
    public searchResults: any;

    // http call
    public searchMovieEntries(term): Observable<any> {
        if (term === '') {
            console.log('Not defined');  // ovo treba promijeniti kasnije
            // return empty()
        } else {
            const params = { query: term };
            return this.httpClient.get(this.baseMovieUrl, { params });
        }
    }
    
    public searchShowsEntries(term): Observable<any> {
        if(term === ''){
            console.log('Not defined');
        }else {
            const params = {query: term};
            return this.httpClient.get(this.baseShowsUrl, { params });
        }
    }
    public _searchMovieEntries(term: any) {
        return this.searchMovieEntries(term);
    }

    public _searchShowEntries(term: any){
        return this.searchShowsEntries;
    }
}
