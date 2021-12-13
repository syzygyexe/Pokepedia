package com.borisov.alexander.pokepedia.controller;

import com.borisov.alexander.pokepedia.model.Pokemon;
import com.borisov.alexander.pokepedia.service.PokepediaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pokepedia")
public class PokepediaController {
    private final PokepediaService pokepediaService;

    public PokepediaController(PokepediaService pokepediaService) {
        this.pokepediaService = pokepediaService;
    }

    /**
     * HTTP GET request to fetch all pokemons.
     * @param NONE
     * @return Pokemon<List>
     */
    @GetMapping("/all")
    public ResponseEntity<List<Pokemon>> getAllPokemons() {
        List<Pokemon> pokemons = pokepediaService.findAllPokemons();
        return new ResponseEntity<>(pokemons, HttpStatus.OK);
    }

    /**
     * HTTP GET request to fetch pokemon(s) by provided type in the select boxes.
     * @param type
     * @return List<Pokemon>
     */
    @GetMapping("/type")
    public ResponseEntity<List<Pokemon>> getPokemonByTypeIn(@RequestParam List<String> t) {
        List<Pokemon> pokemons = pokepediaService.findPokemonsByTypeIn(t);
        return new ResponseEntity<>(pokemons, HttpStatus.OK);
    }

    /**
     * HTTP GET request to fetch pokemon(s) by provided input in the search field.
     * @param name
     * @return List<Pokemon>
     */
    @GetMapping("/name")
    public ResponseEntity<List<Pokemon>> findPokemonsByName(@RequestParam String n) {
        List<Pokemon> pokemons = pokepediaService.findPokemonsByName(n);
        return new ResponseEntity<>(pokemons, HttpStatus.OK);
    }
}