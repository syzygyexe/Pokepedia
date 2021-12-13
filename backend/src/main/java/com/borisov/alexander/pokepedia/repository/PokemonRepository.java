package com.borisov.alexander.pokepedia.repository;

import com.borisov.alexander.pokepedia.model.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, Long> {
    List<Pokemon> findPokemonsByTypeIn(List<String> type);

    @Query(nativeQuery=true, value="SELECT * FROM pokelist WHERE name LIKE ?1%")
    List<Pokemon> findPokemonsByName(String pokemonName);

    Pokemon findPokemonByName(String pokemonName);
}
