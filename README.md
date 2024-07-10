# API-POKEMON
# Pokedex
Ce projet est un Pokedex interactif utilisant l'API Pokemon pour afficher des informations sur divers Pokemons.

## Fonctionnalités
- Affichage de cartes de Pokemon avec leur image, nom, types, talents et statistiques.
- Recherche de Pokemon par nom.
- Filtrage de Pokemon par type.

## Structure du Projet
- `index.html` : Fichier HTML principal contenant la structure de la page.
- `app.js` : Fichier JavaScript contenant la logique de l'application et les appels à l'API Pokemon.
- `style.css` : Fichier CSS contenant les styles pour la mise en page de l'application.

## Utilisation de l'API Pokemon
### Chargement Initial des Pokemons

Au chargement de la page, l'application génère 150 cartes de Pokemon aléatoires en utilisant la fonction `generateRandomPokemonCards`.
Cette fonction utilise un nombre aléatoire pour récupérer les informations de chaque Pokemon depuis l'API Pokemon.

### Recherche de Pokemon par Nom
L'application permet également de rechercher un Pokemon par son nom. Lorsque l'utilisateur clique sur le bouton de recherche,
la fonction `createPokemonCard` est appelée avec l'URL correspondant au Pokemon recherché.

### Filtrage de Pokemon par Type
L'utilisateur peut filtrer les Pokemons par type en utilisant le menu déroulant. La fonction `fetchPokemonByType` récupère les URLs de tous les Pokemons du type sélectionné,
puis `generateFilteredPokemonCards` génère les cartes correspondantes.

### Détails des Fonctions

- **createPokemonCard(pokemonUrl)** : Cette fonction envoie une requête à l'API Pokemon pour récupérer les informations d'un Pokemon à partir de l'URL fournie.
  Elle crée ensuite une carte contenant l'image, le nom, les types, les talents et les statistiques du Pokemon.
- **fetchPokemonByType(type)** : Cette fonction envoie une requête à l'API Pokemon pour récupérer la liste des Pokemons d'un type spécifique. Elle renvoie une liste d'URLs des Pokemons.
- **generateRandomPokemonCards(numCards)** : Cette fonction génère un nombre donné de cartes de Pokemon aléatoires en utilisant l'API Pokemon.
- **generateFilteredPokemonCards(type)** : Cette fonction génère des cartes de Pokemon filtrées par type en utilisant les URLs récupérées par `fetchPokemonByType`.
