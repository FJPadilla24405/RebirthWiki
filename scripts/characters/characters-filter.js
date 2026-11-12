const checkboxes = document.querySelectorAll(
    ".filter input[type='checkbox']"
);

function filterCharacters() {

    const filterGroups = document.querySelectorAll(".filter");

    // Comprobar si el filtro de universos es exclusivo
    const exclusive = document.getElementById(
        "universe-exclusive"
    ).checked;

    // Obtener personajes que cumplen los filtros
    const visibleCharacters = sortedCharacters.filter(character => {

        return Array.from(filterGroups).every(group => {

            // Obtener los filtros seleccionados
            // Excluimos el checkbox de modo
            const checked = Array.from(
                group.querySelectorAll(
                    "input[type='checkbox']:checked"
                )
            ).filter(checkbox => checkbox.id !== "universe-exclusive");

            // Si no hay filtros seleccionados, no mostrar personajes
            if (checked.length === 0) {
                return false;
            }

            // Obtener los valores seleccionados
            const values = checked.map(checkbox => checkbox.value);

            // Comprobar universos
            if (group.dataset.filterGroup === "universe") {

                if (exclusive) {
                    // El personaje debe pertenecer a TODOS
                    // los universos seleccionados
                    return values.every(value =>
                        character.tags.includes(value)
                    );
                } else {
                    // El personaje debe pertenecer a ALGUNO
                    return values.some(value =>
                        character.tags.includes(value)
                    );
                }
            }

            // Resto de filtros: comportamiento inclusivo
            return values.some(value =>
                character.creator === value ||
                character.status === value ||
                character.appearance === value ||
                character.species.includes(value)
            );

        });

    });

    // Regenerar las filas
    generateCharacters(visibleCharacters);
}

// Escuchar cambios en los checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", filterCharacters);
});