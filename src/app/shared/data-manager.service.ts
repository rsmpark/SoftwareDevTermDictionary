import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
  EnglishTerm,
  Definition,
  NonEnglishTerm,
  DefinitionRequest,
  IncrementRequest
} from './model/term.model';

@Injectable({ providedIn: 'root' })
export class DataManagerService {
  constructor(private http: HttpClient) {}

  private url = 'https://software-dev-terms-api.herokuapp.com';

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

  getAllEnglishTerms(): Observable<EnglishTerm[]> {
    return this.http.get<EnglishTerm[]>(`${this.url}/api/terms/english`);
  }

  getEnglishTermById(id: number): Observable<EnglishTerm> {
    return this.http.get<EnglishTerm>(`${this.url}/api/terms/english/${id}`);
  }
  getAllEnglishTermsByWord(word: string): Observable<EnglishTerm[]> {
    return this.http.get<EnglishTerm[]>(`${this.url}/api/terms/english?word=${word}`);
  }
  getEnglishTermByWordExactMatch(word: string): Observable<EnglishTerm> {
    return this.http.get<EnglishTerm>(`${this.url}/api/terms/english?word=${word}&exact=true`);
  }

  addEnglishTerm(newTerm: EnglishTerm): Observable<EnglishTerm> {
    return this.http.post<EnglishTerm>(this.url, newTerm, this.httpOptions).pipe(
      tap((newTerm: EnglishTerm) => console.log(`${newTerm} added.`)),
      catchError(this.handleError<EnglishTerm>('English term add'))
    );
  }

  updateEnglishTerm(id: number, newTerm: EnglishTerm): Observable<EnglishTerm> {
    return this.http.put<EnglishTerm>(`${this.url}/${id}`, newTerm, this.httpOptions).pipe(
      tap((newTerm: EnglishTerm) => console.log(`${newTerm} updated.`)),
      catchError(this.handleError<EnglishTerm>('English term update'))
    );
  }

  addEnglishTermDefinition(
    termId: number,
    newDefinition: Definition
  ): Observable<EnglishTerm> {
    return this.http
      .post<EnglishTerm>(
        `${this.url}/${termId}/add-definition`,
        newDefinition,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: EnglishTerm) => console.log(`${newDefinition} added.`)),
        catchError(this.handleError<EnglishTerm>('Definition add'))
      );
  }

  updateEnglishTermDefinition(
    definitionId: number,
    newDefinition: DefinitionRequest
  ): Observable<EnglishTerm> {
    return this.http
      .put<EnglishTerm>(
        `${this.url}/${definitionId}/edit-definition`,
        newDefinition,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: EnglishTerm) => console.log(`${newDefinition} updated.`)),
        catchError(this.handleError<EnglishTerm>('Definition update'))
      );
  }

  incrementHelpYesNonEnglish(
    termId: number,
    termItemId: IncrementRequest
  ): Observable<EnglishTerm> {
    return this.http
      .put<EnglishTerm>(`${this.url}/helpyes/${termId}`, termItemId, this.httpOptions)
      .pipe(
        tap((newTerm: EnglishTerm) => console.log('Help yes incremented')),
        catchError(this.handleError<EnglishTerm>('Help yes increment'))
      );
  }

  incrementHelpNoNonEnglish(
    termId: number,
    termItemId: IncrementRequest
  ): Observable<EnglishTerm> {
    return this.http
      .put<EnglishTerm>(`${this.url}/helpno/${termId}`, termItemId, this.httpOptions)
      .pipe(
        tap((newTerm: EnglishTerm) => console.log('Help no incremented')),
        catchError(this.handleError<EnglishTerm>('Help no increment'))
      );
  }

  incrementLikesNonEnglish(
    definitionId: number,
    definitionItemId: IncrementRequest
  ): Observable<EnglishTerm> {
    return this.http
      .put<EnglishTerm>(
        `${this.url}/definition-like/${definitionId}`,
        definitionItemId,
        this.httpOptions
      )
      .pipe(
        tap(() => console.log(`Like incremented`)),
        catchError(this.handleError<EnglishTerm>('Like incremented'))
      );
  }
  deleteEnglishTerm(termId: number) {
    return this.http.delete(`${this.url}/${termId}`).pipe(
      tap(() => console.log(`Deleted item with id ${termId}`)),
      catchError(this.handleError('User delete'))
    );
  }
  getAllNonEnglishTerms(): Observable<NonEnglishTerm[]> {
    return this.http.get<NonEnglishTerm[]>(`${this.url}/api/terms/english`);
  }

  getNonEnglishTermById(id: number): Observable<NonEnglishTerm> {
    return this.http.get<NonEnglishTerm>(`${this.url}/api/terms/english/${id}`);
  }
  getAllNonEnglishTermsByWord(word: string): Observable<NonEnglishTerm[]> {
    return this.http.get<NonEnglishTerm[]>(`${this.url}/api/terms/english?word=${word}`);
  }

  addNonEnglishTerm(newTerm: NonEnglishTerm): Observable<NonEnglishTerm> {
    return this.http.post<NonEnglishTerm>(this.url, newTerm, this.httpOptions).pipe(
      tap((newTerm: NonEnglishTerm) => console.log(`${newTerm} added.`)),
      catchError(this.handleError<NonEnglishTerm>('English term add'))
    );
  }

  updateNonEnglishTerm(id: number, newTerm: NonEnglishTerm): Observable<NonEnglishTerm> {
    return this.http.put<NonEnglishTerm>(`${this.url}/${id}`, newTerm, this.httpOptions).pipe(
      tap((newTerm: NonEnglishTerm) => console.log(`${newTerm} updated.`)),
      catchError(this.handleError<NonEnglishTerm>('English term update'))
    );
  }

  addNonEnglishTermDefinition(
    termId: number,
    newDefinition: Definition
  ): Observable<NonEnglishTerm> {
    return this.http
      .post<NonEnglishTerm>(
        `${this.url}/${termId}/add-definition`,
        newDefinition,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: NonEnglishTerm) => console.log(`${newDefinition} added.`)),
        catchError(this.handleError<NonEnglishTerm>('Definition add'))
      );
  }

  updateNonEnglishTermDefinition(
    definitionId: number,
    newDefinition: DefinitionRequest
  ): Observable<NonEnglishTerm> {
    return this.http
      .put<NonEnglishTerm>(
        `${this.url}/${definitionId}/edit-definition`,
        newDefinition,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: NonEnglishTerm) => console.log(`${newDefinition} updated.`)),
        catchError(this.handleError<NonEnglishTerm>('Definition update'))
      );
  }

  incrementHelpYes(termId: number, termItemId: IncrementRequest): Observable<NonEnglishTerm> {
    return this.http
      .put<NonEnglishTerm>(`${this.url}/helpyes/${termId}`, termItemId, this.httpOptions)
      .pipe(
        tap((newTerm: NonEnglishTerm) => console.log('Help yes incremented')),
        catchError(this.handleError<NonEnglishTerm>('Help yes increment'))
      );
  }

  incrementHelpNo(termId: number, termItemId: IncrementRequest): Observable<NonEnglishTerm> {
    return this.http
      .put<NonEnglishTerm>(`${this.url}/helpno/${termId}`, termItemId, this.httpOptions)
      .pipe(
        tap((newTerm: NonEnglishTerm) => console.log('Help no incremented')),
        catchError(this.handleError<NonEnglishTerm>('Help no increment'))
      );
  }

  incrementLikes(
    definitionId: number,
    definitionItemId: IncrementRequest
  ): Observable<NonEnglishTerm> {
    return this.http
      .put<NonEnglishTerm>(
        `${this.url}/definition-like/${definitionId}`,
        definitionItemId,
        this.httpOptions
      )
      .pipe(
        tap(() => console.log(`Like incremented`)),
        catchError(this.handleError<NonEnglishTerm>('Like incremented'))
      );
  }
  deleteNonEnglishTerm(termId: number) {
    return this.http.delete(`${this.url}/${termId}`).pipe(
      tap(() => console.log(`Deleted item with id ${termId}`)),
      catchError(this.handleError('User delete'))
    );
  }
}
