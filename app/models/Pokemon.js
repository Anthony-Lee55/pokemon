import { AppState } from "../AppState.js"


export class Pokemon {
  constructor(data) {
    this.name = data.name
    this.url = data.url
  }

  get ListTemplate() {
    return `
    <div class="btn text-start" role="button" onclick="app.PokemonController.getActivePokemon('${this.name}')">${this.name}${this.ActiveClass}</div>
    `
  }

  get ActiveClass() {
    if (AppState.activePokemon && AppState.activePokemon.name == this.name) {
      return '<i class="mdi-cached ms-2"></i>'
    }
    return ''
  }

}

export class FullPokemon extends Pokemon {
  constructor(data) {
    super(data)
    this.id = data._id ?? ''
    this.nickName = data.nickName ?? ''
    this.img = data.img ?? data.sprites.front_default
    this.backImg = data.backImg ?? data.sprites.back_default
    this.weight = data.weight
    this.height = data.height
    this.health = data.health ?? data.stats[0].base_stat
    this.defense = data.defense ?? data.stats[2].base_stat
    this.attack = data.attack ?? data.stats[1].base_stat
    this.speed = data.speed ?? data.stats[5].base_stat
    this.type = data.types
  }

  get MyListTemplate() {
    return `
    <div role="button" onclick="app.SandboxController.setActivePokemon('${this.name}')" class="col-10 btn text-start">
    ${this.name}
    </div>
    <button onclick="app.SandboxController.removePokemon('${this.name}')" title="remove ${this.name}" class="btn btn-outline-danger border-0">Delete</button>
    `
  }

  get activeTemplate() {
    return `
<div
      class="border border-1 border-danger rounded text-success p-2 h-100 d-flex flex-column justify-content-between">
      <div class="border border-1 border-success rounded px-3 py-1 d-flex justify-content-between text-capitalize">
        <span>${this.name}</span>
        <span>${this.nickName}</span>
      </div>
      <div class="d-flex justify-content-center">
        <img src="${this.img}" alt="Front of ${this.name}" class="w-25">
        <img src="${this.backImg}" alt="Back of ${this.name}" class="w-25">
      </div>
      <div>
        <div class="border border-1 border-success rounded p-3">
          <div class="mb-2 d-flex gap-2">
            ${this.types}
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Health:</span>
            <span>${this.health} hp</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Attack:</span>
            <span>${this.attack} ap</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Defense:</span>
            <span>${this.defense} dp</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Speed:</span>
            <span>${this.speed} sp</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Weight:</span>
            <span>${this.weight} lbs</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Height:</span>
            <span>${this.height} ft</span>
          </div>
        </div>
        <button onclick=app.SandboxController.saveActivePokemon()>Add Pokemon</button>
      </div>
    </div>
          `
  }

  get types() {
    const icons = {
      normal: 'mdi-emoticon-neutral',
      fighting: 'mdi-boxing-glove',
      flying: 'mdi-bee',
      poison: 'mdi-bottle-tonic-skull',
      ground: 'mdi-floor-plan',
      rock: 'mdi-octagon',
      bug: 'mdi-spider-thread',
      ghost: 'mdi-ghost-outline',
      steel: 'mdi-hard-hat',
      fire: 'mdi-fire',
      water: 'mdi-water',
      grass: 'mdi-grass',
      electric: 'mdi-flash',
      physic: 'mdi-robot-confused',
      ice: 'mdi-delete-variant',
      dragon: 'mdi-snake',
      dark: 'mdi-brightness-3',
      fairy: 'mdi-candy-outline',
      stellar: 'mdi-auto-fix',
      unknown: 'mdi-crosshairs-question'
    }

    let types = ''
    this.type.forEach(typeObj => {
      const name = typeObj.type.name
      const icon = icons[name]
      types += `
      <span class="bg-light text-capitalize rounded-pill text-dark px-2 py-1 shadow">
        <i class="fs-4 me-2 mdi ${icon}"></i><span>${name}</span>
      </span>
      `
    })
    return types
  }

}

