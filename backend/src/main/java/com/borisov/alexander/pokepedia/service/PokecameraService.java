package com.borisov.alexander.pokepedia.service;

import com.borisov.alexander.pokepedia.model.Pokemon;
import com.borisov.alexander.pokepedia.repository.PokemonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PokecameraService {
    private final PokemonRepository pokemonRepository;

    public PokecameraService(PokemonRepository pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }

    /**
     * Returns a pokemon filtered by the name(s).
     * @param name
     * @return
     */
    public Pokemon findPokemonByName(String name) {
        return pokemonRepository.findPokemonByName(name);
    }
}
