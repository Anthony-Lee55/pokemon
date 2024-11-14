import { AppState } from "../AppState.js";
import { sandboxService } from "../services/SandboxService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";


export class SandboxController {

  constructor() {
    console.log('🥪');
    AppState.on('account', this.getMyPokemon)
    AppState.on('my-pokemon', this.drawMyPokemon)
  }

  async saveActivePokemon() {
    try {
      await sandboxService.saveActivePokemon()
    } catch (error) {
      Pop.toast("There was an issue saving the Pokemon")
    }
  }

  async getMyPokemon() {
    try {
      await sandboxService.getMyPokemon()
    } catch (error) {
      Pop.toast("There was a problem getting your Pokemon")
      console.error(error)
    }
  }

  drawMyPokemon() {
    const pokemon = AppState.myPokemon
    let myListContent = ''
    pokemon.forEach(pokemon => myListContent += pokemon.MyListTemplate)
    setHTML('my-pokemon', myListContent)
  }

  setActivePokemon(pokemonName) {
    sandboxService.setActivePokemon(pokemonName)
  }

  async removePokemon(pokemonName) {
    try {
      await sandboxService.removePokemon(pokemonName)
    } catch (error) {
      Pop.toast("Could not remove your Pokemon")
      console.error(error)
    }
  }
}