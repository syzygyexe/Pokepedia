package com.borisov.alexander.pokepedia.controller;

import com.borisov.alexander.pokepedia.model.Pokemon;
import com.borisov.alexander.pokepedia.service.PokecameraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/pokecamera")
public class PokecameraController {
    PokecameraService pokecameraService;

    public PokecameraController(PokecameraService pokecameraService) {
        this.pokecameraService = pokecameraService;
    }

    @GetMapping("/name")
    public ResponseEntity<Pokemon> findPokemonByName(@RequestParam String n) {
        Pokemon pokemon = pokecameraService.findPokemonByName(n);
        return new ResponseEntity<>(pokemon, HttpStatus.OK);
    }
}
