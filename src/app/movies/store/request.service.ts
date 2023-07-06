import { Injectable } from '@angular/core';
import { MoviesProps, MoviesStore } from './movies.store';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  getMovies(): Observable<MoviesProps[]> {
    return of([
      {
        id: '1',
        name: 'pulp fiction',
        releaseData: ''
      },
      {
        id: '2',
        name: 'save',
        releaseData: ''
      }
    ]);
  }
}
