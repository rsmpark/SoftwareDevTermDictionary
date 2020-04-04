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
  EnglishTermRequest,
  ISOLanguageCodeAPI
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

  getEnglishTermById(id: string): Observable<EnglishTermApi> {
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
    return this.http
      .put<EnglishTermApi>(
        `${this.url}/${this.englishTermUrl}/${id}`,
        newTerm,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: EnglishTermApi) => console.log(`${newTerm} updated.`)),
        catchError(this.handleError<EnglishTermApi>('English term update'))
      );
  }

  addEnglishTermDefinition(
    termId: string,
    newDefinition: DefinitionRequest
  ): Observable<EnglishTermApi> {
    return this.http
      .put<EnglishTermApi>(
        `${this.url}/${this.englishTermUrl}/${termId}/add-definition`,
        newDefinition,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: EnglishTermApi) => console.log(`${newDefinition} added.`)),
        catchError(this.handleError<EnglishTermApi>('Definition add'))
      );
  }

  updateEnglishTermDefinition(
    definitionId: string,
    newDefinition: DefinitionRequest
  ): Observable<EnglishTermApi> {
    return this.http
      .put<EnglishTermApi>(
        `${this.url}/${this.englishTermUrl}/${definitionId}/edit-definition`,
        newDefinition,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: EnglishTermApi) => console.log(`${newDefinition} updated.`)),
        catchError(this.handleError<EnglishTermApi>('Definition update'))
      );
  }

  incrementHelpYes(termId: string, termItemId: IncrementRequest): Observable<EnglishTermApi> {
    return this.http
      .put<EnglishTermApi>(
        `${this.url}/${this.englishTermUrl}/helpyes/${termId}`,
        termItemId,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: EnglishTermApi) => console.log('Help yes incremented')),
        catchError(this.handleError<EnglishTermApi>('Help yes increment'))
      );
  }

  incrementHelpNo(termId: string, termItemId: IncrementRequest): Observable<EnglishTermApi> {
    return this.http
      .put<EnglishTermApi>(
        `${this.url}/${this.englishTermUrl}/helpno/${termId}`,
        termItemId,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: EnglishTermApi) => console.log('Help no incremented')),
        catchError(this.handleError<EnglishTermApi>('Help no increment'))
      );
  }

  incrementLikes(
    definitionId: string,
    definitionItemId: IncrementRequest
  ): Observable<EnglishTermApi> {
    return this.http
      .put<EnglishTermApi>(
        `${this.url}/${this.englishTermUrl}/definition-like/${definitionId}`,
        definitionItemId,
        this.httpOptions
      )
      .pipe(
        tap(() => console.log(`Like incremented`)),
        catchError(this.handleError<EnglishTermApi>('Like incremented'))
      );
  }
  incrementHelpYesOther(
    termId: string,
    termItemId: IncrementRequest
  ): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(
        `${this.url}/${this.nonEnglishTermUrl}/helpyes/${termId}`,
        termItemId,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log('Help yes incremented')),
        catchError(this.handleError<NonEnglishTermApi>('Help yes increment'))
      );
  }

  incrementHelpNoOther(
    termId: string,
    termItemId: IncrementRequest
  ): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(
        `${this.url}/${this.nonEnglishTermUrl}/helpno/${termId}`,
        termItemId,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log('Help no incremented')),
        catchError(this.handleError<NonEnglishTermApi>('Help no increment'))
      );
  }

  incrementLikesOther(
    definitionId: string,
    definitionItemId: IncrementRequest
  ): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(
        `${this.url}/${this.nonEnglishTermUrl}/definition-like/${definitionId}`,
        definitionItemId,
        this.httpOptions
      )
      .pipe(
        tap(() => console.log(`Like incremented`)),
        catchError(this.handleError<NonEnglishTermApi>('Like incremented'))
      );
  }

  deleteEnglishTerm(termId: string) {
    return this.http.delete(`${this.url}/${this.englishTermUrl}/${termId}`).pipe(
      tap(() => console.log(`Deleted item with id ${termId}`)),
      catchError(this.handleError('User delete'))
    );
  }

  getAllNonEnglishTerms(): Observable<NonEnglishTermApi[]> {
    return this.http.get<NonEnglishTermApi[]>(`${this.url}/${this.nonEnglishTermUrl}`);
  }

  getNonEnglishTermById(id: string): Observable<NonEnglishTermApi> {
    return this.http.get<NonEnglishTermApi>(`${this.url}/${this.nonEnglishTermUrl}/${id}`);
  }

  getAllNonEnglishTermsByWord(word: string): Observable<NonEnglishTermApi[]> {
    return this.http.get<NonEnglishTermApi[]>(
      `${this.url}/${this.nonEnglishTermUrl}?word=${word}`
    );
  }

  getNonEnglishTermByWordExactMatch(word: string): Observable<EnglishTermApi> {
    return this.http.get<EnglishTermApi>(
      `${this.url}/${this.nonEnglishTermUrl}?word=${word}&exact=true`
    );
  }

  addNonEnglishTerm(newTerm: NonEnglishTermApi): Observable<NonEnglishTermApi> {
    return this.http
      .post<NonEnglishTermApi>(
        `${this.url}/${this.nonEnglishTermUrl}`,
        newTerm,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log(`${newTerm} added.`)),
        catchError(this.handleError<NonEnglishTermApi>('English term add'))
      );
  }

  updateNonEnglishTerm(id: string, newTerm: NonEnglishTermApi): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(
        `${this.url}/${this.nonEnglishTermUrl}/${id}`,
        newTerm,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log(`${newTerm} updated.`)),
        catchError(this.handleError<NonEnglishTermApi>('English term update'))
      );
  }

  addNonEnglishTermDefinition(
    termId: string,
    newDefinition: DefinitionRequest
  ): Observable<NonEnglishTermApi> {
    return this.http
      .post<NonEnglishTermApi>(
        `${this.url}/${termId}/${this.nonEnglishTermUrl}/${termId}/add-definition`,
        newDefinition,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log(`${newDefinition} added.`)),
        catchError(this.handleError<NonEnglishTermApi>('Definition add'))
      );
  }

  updateNonEnglishTermDefinition(
    definitionId: string,
    newDefinition: DefinitionRequest
  ): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(
        `${this.url}/${this.nonEnglishTermUrl}/${definitionId}/edit-definition`,
        newDefinition,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log(`${newDefinition} updated.`)),
        catchError(this.handleError<NonEnglishTermApi>('Definition update'))
      );
  }

  incrementHelpYesNonEnglish(
    termId: string,
    termItemId: IncrementRequest
  ): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(
        `${this.url}/${this.nonEnglishTermUrl}/helpyes/${termId}`,
        termItemId,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log('Help yes incremented')),
        catchError(this.handleError<NonEnglishTermApi>('Help yes increment'))
      );
  }

  incrementHelpNoNonEnglish(
    termId: string,
    termItemId: IncrementRequest
  ): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(
        `${this.url}/${this.nonEnglishTermUrl}/helpno/${termId}`,
        termItemId,
        this.httpOptions
      )
      .pipe(
        tap((newTerm: NonEnglishTermApi) => console.log('Help no incremented')),
        catchError(this.handleError<NonEnglishTermApi>('Help no increment'))
      );
  }

  incrementLikesNonEnglish(
    definitionId: string,
    definitionItemId: IncrementRequest
  ): Observable<NonEnglishTermApi> {
    return this.http
      .put<NonEnglishTermApi>(
        `${this.url}/${this.nonEnglishTermUrl}/definition-like/${definitionId}`,
        definitionItemId,
        this.httpOptions
      )
      .pipe(
        tap(() => console.log(`Like incremented`)),
        catchError(this.handleError<NonEnglishTermApi>('Like incremented'))
      );
  }

  deleteNonEnglishTerm(termId: number) {
    return this.http.delete(`${this.url}/${this.nonEnglishTermUrl}/${termId}`).pipe(
      tap(() => console.log(`Deleted item with id ${termId}`)),
      catchError(this.handleError('User delete'))
    );
  }

  getAllLanguageCodes() {
    return this.http.get<ISOLanguageCodeAPI[]>(`${this.url}/api/languages`);
  }
}
