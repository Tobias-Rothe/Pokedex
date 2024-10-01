function getCardTemplate(pokeIndex, index) {
  return /*html*/ `
      <div class="pokemon-card-container" onclick="showLargeCard(${index})">
      <div class="pokemon-card background">
        <div class="card-header">
          <h2 class="pokemon-name"> ${pokeIndex.name} #${pokeIndex.id}</h2>
          <span class="pokemon-hp"> HP:${pokeIndex.stats[0].base_stat}</span>
        </div>
        <div class="card-image ${pokeIndex.types[0].type.name} ">
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

function getLargeCardTemplate(index) {
  return /*html*/ `
     <h2> ${pokemonData[index].name} #${pokemonData[index].id}</h2>
      <img  src="${pokemonData[index].sprites.other["home"].front_default}"/>
      <p>Typ: ${
        pokemonData[index].types.length > 1
          ? `${pokemonData[index].types[0].type.name} / ${pokemonData[index].types[1].type.name}`
          : pokemonData[index].types[0].type.name
      }</p>
      <p>HP:${pokemonData[index].stats[0].base_stat}</p>
      <p>Attacken:${pokemonData[index].moves[0].move.name}</p>
      <p><button onclick="closeLargeCard()">Schließen</button></p>
  `;
}
