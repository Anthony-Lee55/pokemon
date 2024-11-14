import { AppState } from "../AppState.js";
import { FullPokemon, Pokemon } from "../models/Pokemon.js";

// @ts-ignore
const pokemonApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
})


class PokemonService {

  async getPokemon() {
    const response = await pokemonApi.get('pokemon')
    console.log('🫳🔴', response.data);
    const pokemon = response.data.results.map(pokemonData => new Pokemon(pokemonData))
    AppState.pokemon = pokemon
  }

  async getActivePokemon(pokemonName) {
    const response = await pokemonApi.get(`pokemon/${pokemonName}`)
    console.log('🫳🔴📡', response.data);
    const pokemon = new FullPokemon(response.data)
    AppState.activePokemon = pokemon
  }
}

export const pokemonService = new PokemonService()