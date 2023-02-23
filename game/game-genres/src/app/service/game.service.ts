import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../model/game";
import {Genres} from "../model/genres";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private API_URL = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {
  }

  findAllGameSearch(nameSearch: string, codeSearch: string, productSearch: string, genresSearch: string): Observable<Game[]> {
    return this.httpClient.get<Game[]>('http://localhost:3000/' + 'game?gameName_like=' + nameSearch + '&gameCode_like=' + codeSearch + '&gameProduct_like=' + productSearch + '&genres.genresName_like=' + genresSearch);
  }

  findGameSearchPaging(numberRecord: number, curPage: number, nameSearch: string, codeSearch: string, productSearch: string, genresSearch: string): Observable<Game[]> {
    return this.httpClient.get<Game[]>('http://localhost:3000/' + 'game?_page=' + curPage + '&_limit=' + numberRecord + '&gameName_like=' + nameSearch + '&gameCode_like=' + codeSearch + '&gameProduct_like=' + productSearch + '&genres.genresName_like=' + genresSearch);
  }

  findAllGenres(): Observable<Genres[]> {
    return this.httpClient.get<Genres[]>('http://localhost:3000/' + 'genres');
  }

  deteleGame(id: number): Observable<Game> {
    return this.httpClient.delete<Game>('http://localhost:3000/' + 'game/' + id)
  }

  detailGame(id: number): Observable<Game> {
    return this.httpClient.get<Game>('http://localhost:3000/' + 'game/' + id)
  }

  buyGame(id: number): Observable<Game>{
    return this.httpClient.get('http://localhost:3000/' + 'game/' + id);
  }

  getById(id: number): Observable<Game> {
    return this.httpClient.get<Game>('http://localhost:3000/' + 'game/' + id)
  }

  addGame(game): Observable<Game>{
    return this.httpClient.post('http://localhost:3000/' + 'game', game);
  }
  updateGame(id: number,game:Game): Observable<Game>{
    return this.httpClient.put<Game>('http://localhost:3000/' + 'game/' + id, game);
  }
}
