import { AppState } from "../AppState.js"
import { FullPokemon } from "../models/Pokemon.js";
import { api } from "./AxiosService.js"


class SandboxService {

  async removePokemon(pokemonName) {
    const response = await api.delete(`api/pokemon/${pokemonName}`)
    console.log('🎮🔴📡', response.data);

  }

  setActivePokemon(pokemonName) {
    const pokemon = AppState.myPokemon.find(pokemon => pokemon.name == pokemonName)
    AppState.activePokemon = pokemon
  }

  async saveActivePokemon() {
    const activePokemon = AppState.activePokemon
    const response = await api.post('api/pokemon', activePokemon)
    console.log('🥪🔴', response.data);
    const pokemon = new FullPokemon(response.data)
    AppState.myPokemon.push(pokemon)
  }

  async getMyPokemon() {
    const response = await api.get('api/pokemon')
    console.log('🥪📡', response.data);
    const pokemon = response.data.map(pokemonData => new FullPokemon(pokemonData))
    console.log(pokemon);
    AppState.myPokemon = pokemon
  }
}

export const sandboxService = new SandboxService