package com.borisov.alexander.pokepedia.service;
import com.borisov.alexander.pokepedia.model.Pokemon;
import com.borisov.alexander.pokepedia.repository.PokemonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PokepediaService {

    private final PokemonRepository pokemonRepository;

    public PokepediaService(PokemonRepository pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }

    /**
     * Returns a list of all 899 pokemons.
     * @param NONE
     * @return List<Pokemon>
     */
    public List<Pokemon> findAllPokemons() {
        return pokemonRepository.findAll();
    }

    /**
     * Returns a list of pokemon(s) filtered by their type(s) in the select boxes.
     * @param List<String>
     * @return List<Pokemon>
     */
    public List<Pokemon> findPokemonsByTypeIn(List<String> type) {
        return pokemonRepository.findPokemonsByTypeIn(type);
    }

    /**
     * Returns a list of pokemon(s) filtered by their name(s) in the input field.
     * @param name
     * @return List<Pokemon>
     */
    public List<Pokemon> findPokemonsByName(String name) {
        return pokemonRepository.findPokemonsByName(name);
    }
}
