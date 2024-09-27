function getCardTemplate(pokeIndex) {
  return /*html*/ `
      <div class="pokemon-card-container">
      <div class="pokemon-card background-${pokeIndex.types[0].type.name}">
        <div class="card-header">
          <h2 class="pokemon-name"> ${pokeIndex.name}</h2>
          <span class="pokemon-hp"> HP:${pokeIndex.stats[0].base_stat}</span>
        </div>
        <div class="card-image ">
        <img  src="${
          pokeIndex.sprites.other["official-artwork"].front_shiny
        }" alt="">
        </div>
        <div class="card-details">
          
          <div class="attack">
            <span class="attack-name">${
              pokeIndex.types.length > 1
                ? `${pokeIndex.types[0].type.name} / ${pokeIndex.types[1].type.name}`
                : pokeIndex.types[0].type.name
            } </span>
            
          </div>
          <div class="attack">
            <span class="attack-name">${pokeIndex.moves[0].move.name}</span>
            
          </div>
        </div>
      </div>
          </div>
    `;
}
