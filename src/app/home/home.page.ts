import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Director: string;
  Actors: string;
  Genre: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Runtime: string;
  Language: string;
  TrailerUrl?: string;
}
@Component({
  selector: 'app-movie',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [RouterLink, IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  movies: Movie[] = [];  // Use the Movie interface for the movies array
  myGenre: string = "";  // Holds the genre selected by the user

  constructor(private movieService: MovieService, private storage: Storage) {}

  ngOnInit() {
    this.fetchMovies();
  }

  // Fetch the list of movies based on the selected genre
  async fetchMovies() {
    this.myGenre = await this.storage.get('genre');  // Retrieve genre from storage
    if (!this.myGenre) {
      this.myGenre = 'War';  // Default genre if no genre is stored
    }

    // Fetch a list of movies based on the genre
    this.movieService.GetMovieData(this.myGenre).subscribe(
      async (data) => {
        if (data && data.Search) {
          const movieDetailsPromises = data.Search.map(async (movie: any) => {
            const movieDetails = await this.movieService.GetMovieDetails(movie.imdbID).toPromise();
            movieDetails.TrailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movieDetails.Title + " trailer")}`;
            return movieDetails;
          });
          

          // Wait for all movie details to be fetched before setting the movies array
          this.movies = await Promise.all(movieDetailsPromises);
        }
      },
      //error if the api fetches no movies
      (error) => {
        console.error('Error fetching movie data:', error);
      }
    );
  }

  // Re-fetch movies when the page is about to enter
  async ionViewWillEnter() {
    await this.storage.create();
    this.fetchMovies();
  }
}