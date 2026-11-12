
const characterList = document.getElementById("character-list");

const charactersPerRow = 6;

// Ordenar personajes alfabéticamente
const sortedCharacters = [...characters].sort((a, b) =>
    a.name.localeCompare(b.name)
);

// Generar un elemento HTML para cada personaje
function createCharacter(character) {

    const li = document.createElement("li");

    li.classList.add(
        character.creator,
        character.status,
        character.appearance,
        ...character.species,
        ...character.tags
    );

    const a = document.createElement("a");
    a.href = character.link;

    const img = document.createElement("img");
    img.src = character.image;
    img.alt = character.name;
    img.width = 150;
    img.height = 150;

    a.appendChild(img);
    a.appendChild(document.createTextNode(character.name));

    li.appendChild(a);

    return li;
}

// Generar las filas de personajes
function generateCharacters(visibleCharacters) {

    characterList.innerHTML = "";

    visibleCharacters.forEach((character, index) => {

        // Crear una fila cada 6 personajes
        if (index % charactersPerRow === 0) {

            const currentRow = document.createElement("ul");
            currentRow.classList.add("box-nav");

            characterList.appendChild(currentRow);
        }

        // Obtener la última fila creada
        const currentRow = characterList.lastElementChild;

        // Añadir el personaje
        currentRow.appendChild(createCharacter(character));

    });

}
