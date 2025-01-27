let chartInstances = {
  statsChart: null,
  movesChart: null,
  typesChart: null,
};
function getCardTemplate(pokeIndex, index) {
  return /*html*/ `
    <div class="pokemon-card-container" onclick="showLargeCard(${index})">
      <div class="pokemon-card background">
        <div class="card-header">
          <h2 class="pokemon-name"> ${pokeIndex.name} #${pokeIndex.id}</h2>
          <span class="pokemon-hp"> HP:${pokeIndex.stats[0].base_stat}</span>
        </div>
        <div class="card-image ${pokeIndex.types[0].type.name} ">
          <img src="${pokeIndex.sprites.other["official-artwork"].front_shiny}" alt="">
        </div>
        <div class="card-details">
          <div class="attack">
            ${
              pokeIndex.types.length > 1
                ? `<span class="attack-name type-container ${pokeIndex.types[0].type.name}">
                  <img class="type-svg" src="${
                    Typesicons[pokeIndex.types[0].type.name].svg
                  }" alt="${Typesicons[pokeIndex.types[0].type.name].name} Icon" />
                  ${Typesicons[pokeIndex.types[0].type.name].name}</span>
                <span class="type-container attack ${pokeIndex.types[1].type.name}">
                  <img class="type-svg" src="${
                    Typesicons[pokeIndex.types[1].type.name].svg
                  }" alt="${Typesicons[pokeIndex.types[1].type.name].name} Icon" />
                  ${Typesicons[pokeIndex.types[1].type.name].name}</span>`
                : `<span class="type-container attack ${pokeIndex.types[0].type.name}">
                  <img class="type-svg" src="${
                    Typesicons[pokeIndex.types[0].type.name].svg
                  }" alt="${Typesicons[pokeIndex.types[0].type.name].name} Icon" />
                  ${Typesicons[pokeIndex.types[0].type.name].name}</span>`
            }
          </div>
          <div class="attack-name">
            <span>${pokeIndex.moves[0].move.name}</span>
          </div>
        </div>
      </div>
    </div>`;
}

function getCardTemplate(pokeIndex, index) {
  return /*html*/ `
    <div class="pokemon-card-container" onclick="showLargeCard(${index})">
      <div class="pokemon-card background">
        <div class="card-header">
          <h2 class="pokemon-name"> ${pokeIndex.name} #${pokeIndex.id}</h2>
          <span class="pokemon-hp"> HP:${pokeIndex.stats[0].base_stat}</span>
        </div>
        <div class="card-image ${pokeIndex.types[0].type.name}">
          <img src="${pokeIndex.sprites.other["official-artwork"].front_shiny}" alt="">
        </div>
        <div class="card-details">
          <div class="attack">
            ${
              pokeIndex.types.length > 1
                ? `<span class="attack-name type-container ${pokeIndex.types[0].type.name}">
                  <img class="type-svg" src="${
                    Typesicons[pokeIndex.types[0].type.name].svg
                  }" alt="${Typesicons[pokeIndex.types[0].type.name].name} Icon" />
                  ${Typesicons[pokeIndex.types[0].type.name].name}</span>
                <span class="type-container attack ${pokeIndex.types[1].type.name}">
                  <img class="type-svg" src="${
                    Typesicons[pokeIndex.types[1].type.name].svg
                  }" alt="${Typesicons[pokeIndex.types[1].type.name].name} Icon" />
                  ${Typesicons[pokeIndex.types[1].type.name].name}</span>`
                : `<span class="type-container attack ${pokeIndex.types[0].type.name}">
                  <img class="type-svg" src="${
                    Typesicons[pokeIndex.types[0].type.name].svg
                  }" alt="${Typesicons[pokeIndex.types[0].type.name].name} Icon" />
                  ${Typesicons[pokeIndex.types[0].type.name].name}</span>`
            }
          </div>
          <div class="attack-name">
            <span>${pokeIndex.moves[0].move.name}</span>
          </div>
        </div>
      </div>
    </div>`;
}

function getLargeCardTemplate(index) {
  const pokemon = pokemonData[index];
  if (!pokemon || !pokemon.stats) {
    console.error(`Ungültige Pokémon-Daten für Index ${index}:`, pokemon);
    return `<div>Fehler: Pokémon-Daten konnten nicht geladen werden.</div>`;
  }

  setTimeout(() => showChart("statsChart", index), 0);

  return /*html*/ `
    <button onclick="back()" class="btn"><</button>
    <div onclick="closeLargeCard()" class="largecard">
      <h2>${pokemon.name} #${pokemon.id}</h2>
      <img src="${pokemon.sprites.other["home"].front_default}" alt="${pokemon.name}" />
      <div class="large-style">
        <div class="tab-container">
          <button class="tab active" onclick=" event.stopPropagation(); showChart('statsChart', ${index})">Base Stats</button>
          <button class="tab" onclick=" event.stopPropagation(); showChart('movesChart', ${index})">Moves</button>
          <button class="tab" onclick=" event.stopPropagation(); showChart('typesChart', ${index})">Types</button>
        </div>
        <div class="chart-container">
          <canvas id="statsChart" class="chart active-chart"></canvas>
          <canvas id="movesChart" class="chart"></canvas>
          <canvas id="typesChart" class="chart"></canvas>
        </div>
      </div>
    </div>
    <button class="btn" onclick="next()">></button>
  `;
}

function showChart(chartId, index) {
  const tabs = document.querySelectorAll(".tab");
  const charts = document.querySelectorAll(".chart");

  tabs.forEach((tab) => tab.classList.remove("active"));
  charts.forEach((chart) => chart.classList.remove("active-chart"));

  const activeTab = [...tabs].find((tab) => tab.getAttribute("onclick").includes(chartId));
  if (activeTab) activeTab.classList.add("active");

  const activeChart = document.getElementById(chartId);
  if (activeChart) {
    activeChart.classList.add("active-chart");
  }

  if (chartInstances[chartId]) {
    chartInstances[chartId].destroy();
    chartInstances[chartId] = null;
  }

  if (chartId === "statsChart") {
    renderStatsChart(index);
  } else if (chartId === "movesChart") {
    renderMovesChart(index);
  } else if (chartId === "typesChart") {
    renderTypesChart(index);
  }
}

function renderStatsChart(index) {
  const ctx = document.getElementById("statsChart").getContext("2d");
  const statsData = pokemonData[index].stats.map((stat) => stat.base_stat);
  const statLabels = pokemonData[index].stats.map((stat) => stat.stat.name);

  chartInstances["statsChart"] = new Chart(ctx, {
    type: "bar",
    data: {
      labels: statLabels,
      datasets: [
        {
          label: "Base Stats",
          data: statsData,
          backgroundColor: "#FF6384",
          borderColor: "#FF6384",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: "white",
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw}`;
            },
          },
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          titleColor: "white",
          bodyColor: "white",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "white",
            font: {
              size: 12,
            },
          },
          title: {
            display: true,
            text: "Stats",
            color: "white",
          },
        },
        x: {
          ticks: {
            color: "white",
            font: {
              size: 12,
            },
          },
          title: {
            display: true,
            text: "Attributes",
            color: "white",
          },
        },
      },
    },
  });
}

async function renderMovesChart(index) {
  const ctx = document.getElementById("movesChart").getContext("2d");
  const movesData = pokemonData[index].moves;
  if (!movesData || movesData.length === 0) {
    console.log(`Keine Moves für Pokémon ${pokemonData[index].name} gefunden`);
    return;
  }

  const moveNames = [];
  const movePowers = [];
  const movePromises = movesData.slice(0, 4).map(async (moveData) => {
    const moveName = moveData.move.name;
    moveNames.push(moveName);
    try {
      const response = await fetch(moveData.move.url);
      const moveDetails = await response.json();
      return moveDetails.power || 50;
    } catch (error) {
      return 50;
    }
  });

  const resolvedPowers = await Promise.all(movePromises);
  movePowers.push(...resolvedPowers);

  chartInstances["movesChart"] = new Chart(ctx, {
    type: "bar",
    data: {
      labels: moveNames,
      datasets: [
        {
          label: "Move Power",
          data: movePowers,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: "#000",
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw} Power`;
            },
          },
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          titleColor: "white",
          bodyColor: "white",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "white",
            font: {
              size: 12,
            },
          },
          title: {
            display: true,
            text: "Power",
            color: "white",
          },
        },
        x: {
          ticks: {
            color: "white",
            font: {
              size: 12,
            },
          },
          title: {
            display: true,
            text: "Moves",
            color: "white",
          },
        },
      },
    },
  });
}

function renderTypesChart(index) {
  const ctx = document.getElementById("typesChart").getContext("2d");
  const typesData = pokemonData[index].types;

  if (!typesData || typesData.length === 0) {
    console.log(`Keine Types für Pokémon ${pokemonData[index].name} gefunden`);
    return;
  }

  const typeNames = typesData.map((type) => type.type.name);
  const typeDistribution = Array(typeNames.length).fill(100 / typeNames.length);

  chartInstances["typesChart"] = new Chart(ctx, {
    type: "pie",
    data: {
      labels: typeNames,
      datasets: [
        {
          label: "Type Distribution",
          data: typeDistribution,
          backgroundColor: ["#FF4500", "#1E90FF", "#32CD32", "#FFD700"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}
