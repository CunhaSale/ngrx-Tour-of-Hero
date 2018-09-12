import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
//import { HEROES } from '../models/mock-heroes';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of'
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeroService {
  private url = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  private log(message: string){
    this.messageService.add(`Hero Service: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.body.error}`);
      return of(result as T);
    }
  }

  getHeroes(): Observable<Hero[]>{
    //this.messageService.add('Fetched heroes')
    return this.http.get<Hero[]>(this.url)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero>{
    //this.messageService.add(`Hero Service: Fetched hero id=${id}`);
    //return of(HEROES.find(hero => hero.id === id));
    return this.http.get<Hero>(`${this.url}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.url, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.url, hero, this.httpOptions)
      .pipe(
        tap((hero: Hero) => this.log(`Added hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number'? hero: hero.id;
    return this.http.delete<Hero>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()){return of([]);}
    return this.http.get<Hero[]>(`${this.url}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`Found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

}
