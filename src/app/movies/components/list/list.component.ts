import { Component, OnInit } from '@angular/core';
import { MoviesStore } from '../../store/movies.store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  movies$ = this.moviesStore.allMovies$;
  constructor(private readonly moviesStore: MoviesStore) {
  }

  ngOnInit() {
    this.moviesStore.getMovies().subscribe()
  }
}
