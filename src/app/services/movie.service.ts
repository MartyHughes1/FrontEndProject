import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  // Get a list of movies based on genre
  GetMovieData(genre: string): Observable<any> {
    return this.httpClient.get(`https://www.omdbapi.com/?apikey=6462cf83&s=${genre}`);
  }

  // Get detailed information about a movie by its imdbID
  GetMovieDetails(imdbID: string): Observable<any> {
    return this.httpClient.get(`https://www.omdbapi.com/?apikey=6462cf83&i=${imdbID}`);
  }
}
