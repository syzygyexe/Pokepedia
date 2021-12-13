import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PokepediaService {
  constructor(private http: HttpClient) {}

  // URL for HTTP requests.
  private apiServerUrl = environment.apiBaseUrl;

  // Array of the selected pokemon types.
  private selectedTypes: string[] = [];

  /**
   * HTTP GET request of all pokemons from the database.
   * @returns Pokemon[] array of pokemons.
   */
  public getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiServerUrl}/pokepedia/all`);
  }

  /**
   * HTTP GET request of a certain pokemon(s) type which is(are) selected in the <select> checkbox.
   * @param string[] type.
   * @returns Pokemon[] array of pokemons.
   */
  public getPokemonsByType(type: string[]): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(
      `${this.apiServerUrl}/pokepedia/type?t=${type}`
    );
  }

  /**
   * HTTP GET request of a pokemon(s) by name which is entered in the input field.
   * @param string name.
   * @returns Pokemon[] array of pokemons.
   */
  public getPokemonsByName(name: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(
      `${this.apiServerUrl}/pokepedia/name?n=${name}`
    );
  }

  /**
   * Append selected checkbox(ex) type(s) to the array in order to make further HTTP GET request.
   * @param string currentType.
   * @returns string[] array of selected types.
   */
  public appendType(currentType: string): string[] {
    let index: number;
    if (this.selectedTypes.includes(currentType)) {
      index = this.selectedTypes.indexOf(currentType);
      this.selectedTypes.splice(index, 1);
      return this.selectedTypes;
    } else {
      this.selectedTypes.push(currentType);
      return this.selectedTypes;
    }
  }
}
