const customOptions = {
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true,
};
const P = new Pokedex.Pokedex(customOptions);
let pokemonData = [];

async function loadPokemonOnTheirId(start, end) {
  for (let i = start; i <= end; i++) {
    let pokemon = await P.getPokemonByName(i);
    pokemonData.push(pokemon);
  }
}
function renderPokemonCardSmall() {
  let pokeRef = document.getElementById("content");
  pokeRef.innerHTML = "";
  for (let index = 0; index < pokemonData.length; index++) {
    const pokeIndex = pokemonData[index];
    console.log(pokeIndex);

    pokeRef.innerHTML += getCardTemplate(pokeIndex);
  }
}
async function loadKantoPokemon() {
  await loadPokemonOnTheirId(1, 151);
}

async function init() {
  await loadKantoPokemon();
  renderPokemonCardSmall();
}

// async function getPokedexByName(region) {
//   const pokedex = await P.getPokedexByName(region);
//   for (let i = 0; i < pokedex.pokemon_entries.length; i++) {
//     let pokemonEntry = pokedex.pokemon_entries[i];
//     let pokemonName = pokemonEntry.pokemon_species.name;
//     let pokemonType = pokemonEntry;
//   }
// }
