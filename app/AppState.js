import { FullPokemon, Pokemon } from './models/Pokemon.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {


  /** @type {Pokemon[]} */
  pokemon = []

  /**@type {FullPokemon}*/
  activePokemon = null

  /**@type {FullPokemon[]}*/
  myPokemon = []

  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null
}

export const AppState = createObservableProxy(new ObservableAppState())