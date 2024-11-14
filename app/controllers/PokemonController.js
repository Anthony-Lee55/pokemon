import { AppState } from "../AppState.js";
import { pokemonService } from "../services/PokemonService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";


export class PokemonController {
  constructor() {
    console.log('🔴');
    this.getPokemon()
    AppState.on('pokemon', this.drawPokemonList)
    AppState.on('activePokemon', this.drawActivePokemon)
    AppState.on('activePokemon', this.drawPokemonList)
  }

  async getPokemon() {
    try {
      await pokemonService.getPokemon()
    } catch (error) {
      Pop.toast("Could not get Pokemon", 'error')
      console.error(error)
    }
  }

  async getActivePokemon(pokemonName) {
    try {
      await pokemonService.getActivePokemon(pokemonName)
    } catch (error) {
      Pop.toast("Could not get Active Pokemon", 'error')
      console.error(error)
    }

  }

  drawPokemonList() {
    const pokemon = AppState.pokemon
    let listContent = ''
    pokemon.forEach(pokemon => listContent += pokemon.ListTemplate)
    setHTML('pokemon-list', listContent)
  }

  drawActivePokemon() {
    const activePokemon = AppState.activePokemon
    let activeContent = activePokemon.activeTemplate
    setHTML('active-pokemon', activeContent)
  }
}