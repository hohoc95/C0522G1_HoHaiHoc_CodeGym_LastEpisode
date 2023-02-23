import {Genres} from "./genres";

export interface Game {
  id?: number;
  gameName?: string;
  gameDate?: string;
  gameCode?: string;
  gameProduct?: string;
  gameDescription?: string;
  gameAmount?: number;
  gamePrice?: number;
  genres?: Genres;
}
