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
          <div class="attack">${
            pokeIndex.types.length > 1
              ? `<span class="attack-name type-container ${
                  pokeIndex.types[0].type.name
                }"><img class="type-svg "  src="${
                  Typesicons[pokeIndex.types[0].type.name].svg
                }" alt="${
                  Typesicons[pokeIndex.types[0].type.name].name
                } Icon" />
             ${Typesicons[pokeIndex.types[0].type.name].name}</span>
                    <span class="type-container attack  ${
                      pokeIndex.types[1].type.name
                    }"><img class="type-svg " src="${
                  Typesicons[pokeIndex.types[1].type.name].svg
                }" alt="${
                  Typesicons[pokeIndex.types[1].type.name].name
                } Icon" />
             ${Typesicons[pokeIndex.types[1].type.name].name}</span>`
              : ` <span class="type-container attack ${
                  pokeIndex.types[0].type.name
                }"><img class="type-svg" src="${
                  Typesicons[pokeIndex.types[0].type.name].svg
                }" alt="${
                  Typesicons[pokeIndex.types[0].type.name].name
                } Icon" />
                   ${Typesicons[pokeIndex.types[0].type.name].name}</span>`
          }</div>
                    <div class="attack-name">
                     <span >${pokeIndex.moves[0].move.name}</span>
                    </div>
                  </div>
                </div>
              </div>`;
}

function getLargeCardTemplate(index, pokemon) {
  return /*html*/ `
   <button onclick="back()" class="btn"><</button>
  <div onclick="closeLargeCard()" class="largecard">
   <h2> ${pokemonData[index].name} #${pokemonData[index].id}</h2>
   <img src="${pokemonData[index].sprites.other["home"].front_default}"/>
   <div class="large-style">
      <p>weight:&nbsp; ${pokemonData[0].weight} </p>
      <p> Height:&nbsp;${pokemonData[index].height}</p>
      <p>Base Experience: &nbsp;${pokemonData[index].base_experience}</p>
      <p>Moves: &nbsp; ${pokemonData[index].moves[3].move.name}</p>
    </div>
  </div>
    <button class="btn" onclick="next()">></button>`;
}
