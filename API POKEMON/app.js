const collection = document.getElementById("collection");
const typeFilter = document.getElementById("type-filter");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

const createPokemonCard = async (pokemonUrl) => {
    try {
        let response = await fetch(pokemonUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let data = await response.json();

        // Créer un élément de carte
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        
        // Ajouter la classe 'searched' pour ajuster les marges latérales
        wrapper.classList.add("searched");

        // Créer le wrapper d'image
        let imageWrapper = document.createElement("div");
        imageWrapper.classList.add("image-wrapper");

        // Ajouter l'image du Pokémon
        let image = document.createElement("img");
        image.src = data.sprites.front_default;
        image.alt = data.name;
        imageWrapper.appendChild(image);

        // Ajouter le numéro du Pokémon
        let number = document.createElement("div");
        number.classList.add("number");
        number.textContent = `#${data.id}`;

        // Ajouter le nom du Pokémon
        let name = document.createElement("div");
        name.classList.add("name");
        name.textContent = data.name;

        // Ajouter les types du Pokémon
        let types = document.createElement("div");
        types.classList.add("types");
        types.textContent = data.types.map(type => type.type.name).join(", ");

        // Ajouter les talents du Pokémon
        let abilities = document.createElement("div");
        abilities.classList.add("abilities");
        abilities.textContent = data.abilities.map(ability => ability.ability.name).join(", ");

        // Ajouter les statistiques du Pokémon
        let stats = document.createElement("div");
        stats.classList.add("stats");

        // Boucle à travers les statistiques pour créer des barres de progression
        data.stats.forEach(stat => {
            let statContainer = document.createElement("div");
            statContainer.classList.add("stat-container");

            let statName = document.createElement("div");
            statName.classList.add("stat-name");
            statName.textContent = stat.stat.name;
            let statBar = document.createElement("div");
            statBar.classList.add("stat-bar");
            statBar.style.width = `${stat.base_stat / 1}%`; // La largeur de la barre est basée sur la moitié de la stat base

            statContainer.appendChild(statName);
            statContainer.appendChild(statBar);

            stats.appendChild(statContainer);
        });

        // Ajouter tous les éléments à la carte
        wrapper.appendChild(imageWrapper);
        wrapper.appendChild(name);
        wrapper.appendChild(types);
        wrapper.appendChild(abilities);
        wrapper.appendChild(stats);

        // Ajouter la carte au conteneur principal
        collection.appendChild(wrapper); // Cette ligne n'altère pas les dimensions des autres cartes déjà affichées
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        alert(`Le Pokémon "${searchInput.value}" n'a pas été trouvé.`);
    }
};



const fetchPokemonByType = async (type) => {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let data = await response.json();
        return data.pokemon.map(p => p.pokemon.url);
    } catch (error) {
        console.error('Error fetching Pokémon type data:', error);
        return [];
    }
};

const generateRandomPokemonCards = async (numCards) => {
    collection.innerHTML = ""; // Réinitialise le conteneur des cartes

    for (let i = 0; i < numCards; i++) {
        let randomNumber = Math.ceil(Math.random() * 150); // entre 1 et 150
        let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
        await createPokemonCard(pokemonUrl);
    }
};

const generateFilteredPokemonCards = async (type) => {
    collection.innerHTML = ""; // Réinitialise le conteneur des cartes

    let pokemonUrls = await fetchPokemonByType(type);
    for (let url of pokemonUrls) {
        await createPokemonCard(url);
    }
};

// Événement de changement pour filtrer les Pokémon par type
typeFilter.addEventListener("change", () => {
    let selectedType = typeFilter.value;
    if (selectedType === "") {
        generateRandomPokemonCards(150);
    } else {
        generateFilteredPokemonCards(selectedType);
    }
});

// Événement de clic pour rechercher un Pokémon par nom
searchButton.addEventListener("click", async () => {
    const pokemonName = searchInput.value.trim().toLowerCase();
    if (pokemonName !== "") {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        collection.innerHTML = ""; // Réinitialise le conteneur des cartes pour afficher uniquement le Pokémon recherché
        await createPokemonCard(pokemonUrl);
    } else {
        generateRandomPokemonCards(150); // Réaffiche les Pokémon par défaut si le champ de recherche est vide
    }
});

// Génère 150 cartes de Pokémon aléatoires au chargement de la page
generateRandomPokemonCards(150);
