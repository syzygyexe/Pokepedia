import { HttpErrorResponse } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokepediaService } from 'src/app/service/pokepedia.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PokemonTypesService } from 'src/app/service/pokemon-types.service';

@Component({
  selector: 'pokepedia',
  templateUrl: './pokepedia.component.html',
  styleUrls: ['./pokepedia.component.css'],
})
export class PokepediaComponent {
  constructor(
    private pokepediaService: PokepediaService,
    private pokemonTypesService: PokemonTypesService,
    private modalService: BsModalService
  ) {}

  public defaultImage = '../../../assets/img/unknown_pokemon.png';

  // Amount of pixels left to download before lazyLoading commencement.
  public offset = 100;

  // "Learn more..." button's management modal module.
  public modalRef?: BsModalRef;

  // Pokemon array fetched from the backend.
  public pokemons: Pokemon[] = [];

  // Selected types checkboxes.
  public selectedTypes: string[] = [];

  // Used in order to create all checkboxes with *ngFor.
  public allTypes: string[] = this.pokemonTypesService.allTypes;

  // Pagination Settings.
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: 'Back',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`,
  };
  public config = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: this.pokemons.length,
  };

  ngOnInit() {
    this.getPokemons();
  }

  /**
   * HTTP GET request to fetch all pokemons.
   * @params NONE
   */
  public getPokemons(): void {
    this.pokepediaService.getPokemons().subscribe(
      (response: Pokemon[]) => {
        this.pokemons = response;
        this.config.currentPage = 1;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  /**
   * HTTP GET request to fetch pokemons by provided type in the select boxes.
   * @param type pokemon's type.
   */
  public getPokemonsByType(type: string[], template?: TemplateRef<any>): void {
    // Null check. Error if nothing is selected.
    if (this.selectedTypes.length === 0 || this.selectedTypes === undefined) {
      return this.onOpenModal(template);
    }
    // GET Request.
    this.pokepediaService.getPokemonsByType(type).subscribe(
      (response: Pokemon[]) => {
        this.pokemons = response;
        this.config.currentPage = 1;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  /**
   * HTTP GET request to fetch pokemons by provided input in the search field.
   * @param event input in the search field.
   */
  public getPokemonsByName(event: KeyboardEvent): void {
    let currentInput = (event.target as HTMLInputElement).value;
    this.pokepediaService.getPokemonsByName(currentInput).subscribe(
      (response: Pokemon[]) => {
        this.pokemons = response;
        this.config.currentPage = 1;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  /**
   * Alter items background-color according to its type.
   * @param type pokemon type .
   * @returns string hex color code.
   */
  public setStyle(type: string): string {
    return this.pokemonTypesService.setStyles(type);
  }

  /**
   * Add selected type to the array.
   * @param currentType selected pokemon type in the select boxes.
   * @returns string[] an array of selected pokemon types.
   */
  public appendPokemonType(currentType: string): string[] {
    this.selectedTypes = this.pokepediaService.appendType(currentType);
    return this.selectedTypes;
  }

  /**
   * Change current page number.
   * @param event takes page number through click event.
   */
  public onPageChange(event: number) {
    this.config.currentPage = event;
  }

  /**
   * Shows hidden template.
   * @param template takes hidden template
   */
  onOpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  /**
   * Closes currently opened template.
   * @params NONE
   */
  onCloseModal() {
    this.modalService.hide();
  }
}
