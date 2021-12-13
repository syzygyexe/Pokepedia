import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PokemonTypesService {
  public allTypes: string[] = [
    'Bug',
    'Dark',
    'Dragon',
    'Electric',
    'Fairy',
    'Fighting',
    'Fire',
    'Flying',
    'Ghost',
    'Grass',
    'Ground',
    'Ice',
    'Normal',
    'Poison',
    'Psychic',
    'Rock',
    'Steel',
    'Water',
  ];

  /**
   * Set pokemon styles according to their type
   * @param {string} currentType
   * @returns {string} 'colorHexCode'
   */
  public setStyles(currentType: string): string {
    switch (currentType) {
      case 'Bug':
        return '#A6B91A';
        break;
      case 'Dark':
        return '#705746';
        break;
      case 'Dragon':
        return '#6F35FC';
        break;
      case 'Electric':
        return '#F7D02C';
        break;
      case 'Fairy':
        return '#D685AD';
        break;
      case 'Fighting':
        return '#C22E28';
        break;
      case 'Fire':
        return '#EE8130';
        break;
      case 'Flying':
        return '#A98FF3';
        break;
      case 'Ghost':
        return '#735797';
        break;
      case 'Grass':
        return '#7AC74C';
        break;
      case 'Ground':
        return '#E2BF65';
        break;
      case 'Ice':
        return '#96D9D6';
        break;
      case 'Normal':
        return '#A8A878';
        break;
      case 'Poison':
        return '#A33EA1';
        break;
      case 'Psychic':
        return '#F95587';
        break;
      case 'Rock':
        return '#B6A136';
        break;
      case 'Steel':
        return '#B7B7CE';
        break;
      case 'Water':
        return '#6390F0';
        break;
      default:
        return '#145172';
    }
  }
}
