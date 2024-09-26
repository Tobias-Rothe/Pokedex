const customOptions = {
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true,
};
const P = new Pokedex.Pokedex(customOptions);

async function getPokemonByName(name) {
  const pokemon = await P.getPokemonByName(name);
  // console.log(pokemon);
}

async function getPokedexByName(region) {
  const pokedex = await P.getPokedexByName(region);
  for (let i = 0; i < pokedex.pokemon_entries.length; i++) {
    let pokemonEntry = pokedex.pokemon_entries[i];
    let pokemonName = pokemonEntry.pokemon_species.name;
    let pokemonType = pokemonEntry;
    console.log(pokemonEntry);
  }
}
