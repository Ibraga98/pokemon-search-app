const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const spriteContainer = document.getElementById("sprite-container");

const fetchPokemonData = async () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        alert("Please enter a Pokémon name or ID.");
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

        if (!response.ok) {
            alert("Pokémon not found");
            return;
        }

        const data = await response.json();

        // Update Pokémon details
        pokemonName.textContent = data.name.toUpperCase();
        pokemonId.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;
        hp.textContent = `${data.stats[0].base_stat}`;
        attack.textContent = `${data.stats[1].base_stat}`;
        defense.textContent = `${data.stats[2].base_stat}`;
        specialAttack.textContent = `${data.stats[3].base_stat}`;
        specialDefense.textContent = `${data.stats[4].base_stat}`;
        speed.textContent = `${data.stats[5].base_stat}`;

        // Update Pokémon sprite
        spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name}" />`;

        // Update Pokémon types
        types.innerHTML = "";
        data.types.forEach((type) => {
            const typeElement = document.createElement("li");
            typeElement.textContent = type.type.name.toUpperCase();
            types.appendChild(typeElement);
        });

        // Specific test cases
        if (query === "pikachu") {
            validateTestCase(
                data,
                "PIKACHU",
                "#25",
                "Weight: 60",
                "Height: 4",
                [35, 55, 40, 50, 50, 90]
            );
        }

        if (query === "94") {
            validateTestCase(
                data,
                "GENGAR",
                "#94",
                "Weight: 405",
                "Height: 15",
                [60, 65, 60, 130, 75, 110]
            );
        }
    } catch (error) {
        alert("Pokémon not found");
    }
};

const validateTestCase = (
    data,
    expectedName,
    expectedId,
    expectedWeight,
    expectedHeight,
    expectedStats
) => {
    const actualStats = data.stats.map((stat) => stat.base_stat);
    if (
        pokemonName.textContent === expectedName &&
        pokemonId.textContent === expectedId &&
        weight.textContent === expectedWeight &&
        height.textContent === expectedHeight &&
        JSON.stringify(actualStats) === JSON.stringify(expectedStats)
    ) {
        console.log("Test case passed");
    } else {
        console.error("Test case failed");
    }
};

searchButton.addEventListener("click", fetchPokemonData);