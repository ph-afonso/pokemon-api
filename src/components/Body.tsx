import React from "react";
import { useContext } from "react";
import { Card } from "./Card";
import { PokemonContext } from "@/contexts/PokemonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export const Body = () => {
  const pokemonCtx = useContext(PokemonContext);

  return (
    <div
      className="
        flex-1
        grid
        grid-cols-3
        gap-2
        p-5
        overflow-x-hidden
      "
    >
      {pokemonCtx?.load ? ( // Usando a informação de carregamento
        <div 
          className="
            text-3xl
            text-gray-500
            font-semibold
            col-span-3
            flex
            justify-center
            items-center
          "
        >
          <div className="flex">
            <FontAwesomeIcon icon={faGear} spin/>
            Carregando...
          </div>

        </div>
      ) : (
        pokemonCtx?.pokemons.map((pokemon, index) => (
          <Card
            key={index}
            name={pokemon.name}
            image={
              pokemon.sprites.other?.dream_world?.front_default ||
              pokemon.sprites.other?.home?.front_default ||
              pokemon.sprites.other?.official_artwork?.front_default ||
              pokemon.sprites.front_default ||
              ''
            }
            types={pokemon.types}
          />
        ))
      )}
    </div>
  );
};
