// src/exercise/02.js
import { useState, useEffect } from "react";

export function usePokemon(name) {
  const [state, setState] = useState({
    data: null,
    status: "pending",
    errors: null,
  });

  useEffect(() => {
    if (!name) return;

    async function fetchPokemon() {
      setState({ data: null, status: "pending", errors: null });

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error("Not found");

        const data = await res.json();
        setState({ data, status: "fulfilled", errors: null }); // ✅ Use "fulfilled"
      } catch (err) {
        setState({ data: null, status: "rejected", errors: ["Not found"] }); // ✅ Array
      }
    }

    fetchPokemon();
  }, [name]);

  return state;
}
