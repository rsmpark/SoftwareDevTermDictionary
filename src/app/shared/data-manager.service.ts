import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
  EnglishTermApi,
  Definition,
  NonEnglishTermApi,
  DefinitionRequest,
  IncrementRequest,
  EnglishTermRequest
} from './model/term.model';

@Injectable({ providedIn: 'root' })
export class DataManagerService {
  constructor(private http: HttpClient) {}

  private url = 'https://software-dev-terms-api.herokuapp.com';
  private englishTermUrl = 'api/terms/english';
  private nonEnglishTermUrl = 'api/terms/other';

  // Options object for POST and PUT requests
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Error handler, from the Angular docs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllEnglishTerms(): Observable<EnglishTermApi[]> {
    return this.http.get<EnglishTermApi[]>(`${this.url}/${this.englishTermUrl}`);
  }

  getEnglishTermById(id: number): Observable<EnglishTermApi> {
    return this.http.get<EnglishTermApi>(`${this.url}/${this.englishTermUrl}/${id}`);
  }
  getAllEnglishTermsByWord(word: string): Observable<EnglishTermApi[]> {
    return this.http.get<EnglishTermApi[]>(`${this.url}/${this.englishTermUrl}?word=${word}`);
  }
  getEnglishTermByWordExactMatch(word: string): Observable<EnglishTermApi> {
    return this.http.get<EnglishTermApi>(
      `${this.url}/${this.englishTermUrl}?word=${word}&exact=true`
    );
  }

  addEnglishTerm(newTerm: EnglishTermRequest): Observable<EnglishTermApi> {
    return this.http
      .post<EnglishTermApi>(`${this.url}/${this.englishTermUrl}`, newTerm, this.httpOptions)
      .pipe(
        tap((termResult: EnglishTermApi) => console.log(`${termResult.wordEnglish} added.`)),
        catchError(this.handleError<EnglishTermApi>('English term add'))
      );
  }

  updateEnglishTerm(id: number, newTerm: EnglishTermRequest): Observable<EnglishTermApi> {
    return this.http.put<EnglishTermApi>(`${this.url}/${id}`, newTerm, this.httpOptions).pipe(
      tap((newTerm: EnglishTermApi) => console.log(`${newTerm} updated.`)),
      catchError(this.handleError<EnglishTermApi>('English term update'))
    );
  }

  addEnglishTermDefinition(
    termId: number,
    newDefinition: Definition
  ): Observable<EnglishTermApi> {
    return this.http
      .post<EnglishTermApi>(
        `${this.url}/${termId}/add-definition`,
        newDefinition,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: EnglishTermApi) => console.log(`${newDefinition} added.`)),
        catchError(this.handleError<EnglishTermApi>('Definition add'))
      );
  }

  updateEnglishTermDefinition(
    definitionId: number,
    newDefinition: DefinitionRequest
  ): Observable<EnglishTermApi> {
    return this.http
      .put<EnglishTermApi>(
        `${this.url}/${definitionId}/edit-definition`,
        newDefinition,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: EnglishTermApi) => console.log(`${newDefinition} updated.`)),
        catchError(this.handleError<EnglishTermApi>('Definition update'))
      );
  }

  incrementHelpYesNonEnglish(
    termId: number,
    termItemId: IncrementRequest
  ): Observable<EnglishTermApi> {
    return this.http
      .put<EnglishTermApi>(`${this.url}/helpyes/${termId}`, termItemId, this.httpOptions)
      .pipe(
        tap((newTerm: EnglishTermApi) => console.log('Help yes incremented')),
        catchError(this.handleError<EnglishTermApi>('Help yes increment'))
      );
  }

  incrementHelpNoNonEnglish(
    termId: number,
    termItemId: IncrementRequest
  ): Observable<EnglishTermApi> {
    return this.http
      .put<EnglishTermApi>(`${this.url}/helpno/${termId}`, termItemId, this.httpOptions)
      .pipe(
        tap((newTerm: EnglishTermApi) => console.log('Help no incremented')),
        catchError(this.handleError<EnglishTermApi>('Help no increment'))
      );
  }

  incrementLikesNonEnglish(
    definitionId: number,
    definitionItemId: IncrementRequest
  ): Observable<EnglishTermApi> {
    return this.http
      .put<EnglishTermApi>(
        `${this.url}/definition-like/${definitionId}`,
        definitionItemId,
        this.httpOptions
      )
      .pipe(
        tap(() => console.log(`Like incremented`)),
        catchError(this.handleError<EnglishTermApi>('Like incremented'))
      );
  }
  deleteEnglishTerm(termId: number) {
    return this.http.delete(`${this.url}/${termId}`).pipe(
      tap(() => console.log(`Deleted item with id ${termId}`)),
      catchError(this.handleError('User delete'))
    );
  }
  getAllNonEnglishTerms(): Observable<NonEnglishTermApi[]> {
    return this.http.get<NonEnglishTermApi[]>(`${this.url}/api/terms/english`);
  }

  getNonEnglishTermById(id: number): Observable<NonEnglishTermApi> {
    return this.http.get<NonEnglishTermApi>(`${this.url}/api/terms/english/${id}`);
  }
  getAllNonEnglishTermsByWord(word: string): Observable<NonEnglishTermApi[]> {
    return this.http.get<NonEnglishTermApi[]>(`${this.url}/api/terms/english?word=${word}`);
  }

  addNonEnglishTerm(newTerm: NonEnglishTermApi): Observable<NonEnglishTermApi> {
    return this.http.post<NonEnglishTermApi>(this.url, newTerm, this.httpOptions).pipe(
      tap((newTerm: NonEnglishTermApi) => console.log(`${newTerm} added.`)),
      catchError(this.handleError<NonEnglishTermApi>('English term add'))
    );
  }

  updateNonEnglishTerm(id: number, newTerm: NonEnglishTermApi): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(`${this.url}/${id}`, newTerm, this.httpOptions)
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log(`${newTerm} updated.`)),
        catchError(this.handleError<NonEnglishTermApi>('English term update'))
      );
  }

  addNonEnglishTermDefinition(
    termId: number,
    newDefinition: Definition
  ): Observable<NonEnglishTermApi> {
    return this.http
      .post<NonEnglishTermApi>(
        `${this.url}/${termId}/add-definition`,
        newDefinition,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log(`${newDefinition} added.`)),
        catchError(this.handleError<NonEnglishTermApi>('Definition add'))
      );
  }

  updateNonEnglishTermDefinition(
    definitionId: number,
    newDefinition: DefinitionRequest
  ): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(
        `${this.url}/${definitionId}/edit-definition`,
        newDefinition,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log(`${newDefinition} updated.`)),
        catchError(this.handleError<NonEnglishTermApi>('Definition update'))
      );
  }

  incrementHelpYes(
    termId: number,
    termItemId: IncrementRequest
  ): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(`${this.url}/helpyes/${termId}`, termItemId, this.httpOptions)
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log('Help yes incremented')),
        catchError(this.handleError<NonEnglishTermApi>('Help yes increment'))
      );
  }

  incrementHelpNo(
    termId: number,
    termItemId: IncrementRequest
  ): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(`${this.url}/helpno/${termId}`, termItemId, this.httpOptions)
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log('Help no incremented')),
        catchError(this.handleError<NonEnglishTermApi>('Help no increment'))
      );
  }

  incrementLikes(
    definitionId: number,
    definitionItemId: IncrementRequest
  ): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(
        `${this.url}/definition-like/${definitionId}`,
        definitionItemId,
        this.httpOptions
      )
      .pipe(
        tap(() => console.log(`Like incremented`)),
        catchError(this.handleError<NonEnglishTermApi>('Like incremented'))
      );
  }
  deleteNonEnglishTerm(termId: number) {
    return this.http.delete(`${this.url}/${termId}`).pipe(
      tap(() => console.log(`Deleted item with id ${termId}`)),
      catchError(this.handleError('User delete'))
    );
  }
}
