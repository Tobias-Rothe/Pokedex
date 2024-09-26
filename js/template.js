function getCardTemplate(pokeIndex) {
  return /*html*/ `
        <div class="pokemon-card">
        <span>Name: ${pokeIndex.name}</span>
        <span>Typ:${
          pokeIndex.types.length > 1
            ? `${pokeIndex.types[0].type.name} / ${pokeIndex.types[1].type.name}`
            : pokeIndex.types[0].type.name
        } </span>
        
        <span>KP: ${pokeIndex.stats[0].base_stat}</span>
        <div ><img class="sprite" src="${
          pokeIndex.sprites.other["official-artwork"].front_shiny
        }" alt=""></div>
      </div>
    `;
}
