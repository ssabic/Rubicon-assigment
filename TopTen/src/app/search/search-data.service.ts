import { Injectable } from '@angular/core';

@Injectable()
export class SearchDataService {
    public movieList;
    public tvShowList;
    filter = '';

    constructor() {}

    public getMovieList() {
        return this.movieList;
    }
    public gettvShowList() {
        return this.tvShowList;
    }
    public getFilter() {
        return this.filter;
    }

    public setFilter(filter) {
        this.filter = filter;
    }
}
