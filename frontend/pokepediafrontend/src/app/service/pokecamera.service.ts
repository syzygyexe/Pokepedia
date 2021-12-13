import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../model/pokemon';

@Injectable({ providedIn: 'root' })
export class PokecameraService {
  constructor(private http: HttpClient) {}

  // URL for HTTP requests.
  private apiServerUrl = environment.apiBaseUrl;

  /**
   * HTTP GET request to fetch a Pokemon by name.
   * @param name which is provided by the Tensorflow JS model through webcamera.
   * @returns Pokemon
   */
  public getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      `${this.apiServerUrl}/pokecamera/name?n=${name}`
    );
  }
}
