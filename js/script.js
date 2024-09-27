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
    console.log(pokeIndex.moves[0].move.name);

    pokeRef.innerHTML += getCardTemplate(pokeIndex);
  }
}

async function loadKantoPokemon() {
  await loadPokemonOnTheirId(1, 151);
}

async function init() {
  await loadKantoPokemon();
  renderPokemonCardSmall();
  addHoverEffect();
}

function addHoverEffect() {
  const cards = document.querySelectorAll(".pokemon-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      card.style.setProperty("--mouse-x", (x - 0.5).toString());
      card.style.setProperty("--mouse-y", (y - 0.5).toString());
    });
  });
}
