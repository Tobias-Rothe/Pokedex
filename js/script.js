const customOptions = {
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true,
};

let loadLimit = 10;

function showLoadingSpinner() {
  document.getElementById("dialog-loding-spinner").classList.remove("d-none");
  document.getElementById("content").classList.add("d-none");
}

function hideLoadingSpinner() {
  document.getElementById("dialog-loding-spinner").classList.add("d-none");
  document.getElementById("content").classList.remove("d-none");
}

const P = new Pokedex.Pokedex(customOptions);
let pokemonData = [];
let pokemonSpeciesArray = [];

async function loadPokemonOnTheirId() {
  for (let i = pokemonData.length + 1; i <= loadLimit; i++) {
    if (pokemonData.length > 150) return;

    let pokemon = await P.getPokemonByName(i);

    pokemonData.push(pokemon);
  }
  loadLimit += 10;
}
async function loadPokemonSpeciesOnID(start, end) {
  for (let i = start; i <= end; i++) {
    let pokemonSpecie = await P.getPokemonSpeciesByName(i);
    pokemonSpeciesArray.push(pokemonSpecie);
  }
}

let habitats = [];

async function getHabitats() {
  for (let index = 0; index < pokemonSpeciesArray.length; index++) {
    let habitat = pokemonSpeciesArray[index].habitat.name;
    if (!habitats.includes(habitat)) {
      habitats.push(habitat);
    }
  }
}

async function renderPokemonCardSmall() {
  let pokeRef = document.getElementById("content");
  pokeRef.innerHTML = "";
  for (let index = 0; index < pokemonData.length; index++) {
    const pokeIndex = pokemonData[index];
    pokeRef.innerHTML += getCardTemplate(pokeIndex, index);
  }
}

async function renderMorePokemons() {
  showLoadingSpinner();
  await loadKantoPokemon();
  renderPokemonCardSmall();
  hideLoadingSpinner();
  addHoverEffect();
}

async function loadKantoPokemon() {
  await loadPokemonOnTheirId();
}

async function init() {
  showLoadingSpinner();
  await loadKantoPokemon();
  renderPokemonCardSmall();
  hideLoadingSpinner();
  addHoverEffect();
  getHabitats();
  addHoverEffect();
}

function searchAndShowPokemon() {
  let searchInput = document.getElementById("inputfield").value.toLowerCase();
  if (searchInput.length > 2) {
    document.getElementById("content").innerHTML = "";
    for (let index = 0; index < pokemonData.length; index++) {
      if (pokemonData[index].name.startsWith(searchInput)) {
        document.getElementById("content").innerHTML +=
          renderSingleSmallCard(index);
      }
    }
  } else {
    renderPokemonCardSmall();
  }
}

function renderSingleSmallCard(index) {
  const pokeIndex = pokemonData[index];
  let smallcard = getCardTemplate(pokeIndex, index);
  return smallcard;
}

function showLargeCard(index) {
  let largeCardRef = document.getElementById("loadingscreen-bg");
  largeCardRef.classList.remove("hidden");
  largeCardRef.innerHTML = getLargeCardTemplate(index);
  disableScroll();
  console.log(index);
}

function closeLargeCard() {
  let largeCardRef = document.getElementById("loadingscreen-bg");
  largeCardRef.classList.add("hidden");
  enableScroll();
}

function disableScroll() {
  document.body.classList.add("remove-scrolling");
}

function enableScroll() {
  document.body.classList.remove("remove-scrolling");
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
