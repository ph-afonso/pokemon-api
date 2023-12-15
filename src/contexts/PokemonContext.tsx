import { Pokemon } from "@/types/Pokemon";
import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

type PokemonContextType = {
  pokemons: Pokemon[];
  load: boolean;
  setLoad: (value: boolean) => void;
  searchPokemon: (name: string) => void;
  getPokemonByName: (name: string) => void;
};

export const PokemonContext = createContext<PokemonContextType | null>(null);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');

  const getPokemonsData = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do Pokémon:', error);
    }
  };

  const getPokemons = (url: string) => {
    setLoad(true);
  
    axios.get(url)
      .then(response => {
        const pokemonUrls = response.data.results;
        const promises: Promise<Pokemon>[] = [];
  
        for (let i = 0; i < pokemonUrls.length; i++) {
          const promise = getPokemonsData(pokemonUrls[i].url)
            .then(pokemonData => {
              const types = pokemonData.types.map((type: any) => type.type.name) || ['unknown'];
  
              return {
                name: pokemonData.name,
                sprites: {
                  front_default: pokemonData.sprites?.front_default || '',
                  other: {
                    dream_world: {
                      front_default: pokemonData.sprites?.other?.dream_world?.front_default || '',
                    },
                    home: {
                      front_default: pokemonData.sprites?.other?.home?.front_default || '',
                    },
                    official_artwork: {
                      front_default: pokemonData.sprites?.other?.official_artwork?.front_default || '',
                    },
                  },
                },
                types,
              };
            });
  
          promises.push(promise);
        }
  
        Promise.all(promises)
          .then(tempPokemons => {
            setPokemons(tempPokemons);
          })
          .catch(error => {
            console.error('Erro ao buscar pokémons:', error);
          })
          .finally(() => {
            setTimeout(() => {
              setLoad(false);
            }, 1000);
          });
      })
      .catch(error => {
        console.error('Erro ao buscar a lista de pokémons:', error);
        setLoad(false);
      });
  };

  const getPokemonByName = async (name: string) => {
    try {
      setLoad(true);
      const pokemonData = await getPokemonsData(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

      const types = pokemonData.types.map((type: any) => type.type.name) || ['unknown'];

      const pokemon = {
        name: pokemonData.name,
        sprites: {
          front_default: pokemonData.sprites?.front_default || '',
          other: {
            dream_world: {
              front_default: pokemonData.sprites?.other?.dream_world?.front_default || '',
            },
            home: {
              front_default: pokemonData.sprites?.other?.home?.front_default || '',
            },
            official_artwork: {
              front_default: pokemonData.sprites?.other?.official_artwork?.front_default || '',
            },
          },
        },
        types,
      };

      setPokemons([pokemon]);
    } catch (error) {
      console.error('Erro ao buscar o pokémon:', error);
    } finally {
      setTimeout(() => {
        setLoad(false);
      }, 3000);
    }
  };

  const searchPokemon = async (name: string) => {
    if (name.trim() === '') {
      // Se o input estiver vazio, carrega os 15 primeiros pokémons
      await getPokemons('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1200');
    } else {
      // Se houver um valor no input, busca o Pokémon pelo nome
      await getPokemonByName(name);
    }
  };

  useEffect(() => {
    // Carrega os 15 primeiros pokémons ao montar o componente
    getPokemons('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1200');
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, load, setLoad, searchPokemon, getPokemonByName }}>
      {children}
    </PokemonContext.Provider>
  );
};
