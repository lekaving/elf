import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { map, tap, withLatestFrom } from 'rxjs';
import { RequestService } from './request.service';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { joinRequestResult, trackRequestResult } from '@ngneat/elf-requests';

export interface MoviesProps {
  id: string;
  name: string;
  releaseData: string;
}

// Usage with withProps
const defaultMovies: MoviesProps = {
  id: '',
  name: '',
  releaseData: ''
}

const moviesStore = createStore(
  { name: 'movies' },
  // withProps<MoviesProps>(defaultMovies)
  withEntities<MoviesProps>()
);

@Injectable({
  providedIn: 'root'
})
export class MoviesStore {
  public movies$ = moviesStore.pipe(select(state => state));
  // using entities api
  public allMovies$ = moviesStore.pipe(selectAllEntities(), joinRequestResult(['movies']));

  constructor(private requestService: RequestService) {
  }

  public getMovies() {
    // return this.requestService.getMovies().pipe(tap(res => this.updateMovies(res)));
    // if you are using entities you should use their api
    return this.requestService.getMovies().pipe(tap(this.setEntities), trackRequestResult(['movies']));
  }

  public setEntities(data: MoviesProps[]): void {
    moviesStore.update(setEntities(data));
  }

  public updateMovies(data: MoviesProps[]): void {
    moviesStore.update((state) => ({...state, data}))
  }
}
