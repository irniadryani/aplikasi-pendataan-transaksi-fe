import React, { createContext, useContext, useEffect, useState } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [savedPokemon, setSavedPokemon] = useState(() => {
    const saved = localStorage.getItem("savedPokemon");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedPokemon", JSON.stringify(savedPokemon));
  }, [savedPokemon]);

  const addPokemon = (pokemon) => {
    setSavedPokemon([...savedPokemon, pokemon]);
  };

  const removePokemon = (name) => {
    setSavedPokemon(savedPokemon.filter((pokemon) => pokemon.name !== name));
  };

  return (
    <PokemonContext.Provider
      value={{ savedPokemon, addPokemon, removePokemon }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  return useContext(PokemonContext);
};

export { PokemonContext }; 
