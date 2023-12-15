import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { PokemonContext } from "@/contexts/PokemonContext";
import { Pokemon } from "@/types/Pokemon";

export const Input = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const pokemonCtx = useContext(PokemonContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Chama a função de busca do contexto quando o input é alterado
    pokemonCtx?.searchPokemon(value);
  };

  return (
    <div className="relative">
      <input
        className="
          appearance-none
          bg-white
          border border-gray-300
          hover:border-gray-500
          px-4
          py-2
          rounded
          shadow
          focus:outline-none
          focus:shadow-outline-blue
          pl-8
          mr-5
        "
        type="text"
        placeholder="Digite aqui..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-gray-500">
        <FontAwesomeIcon icon={faSearch} />
      </span>
    </div>
  );
};
