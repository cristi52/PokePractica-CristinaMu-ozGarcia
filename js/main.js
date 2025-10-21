// ---------------- EJERCICIO 1 ----------------
const nav = document.querySelector('.menu');

document.getElementById('water').addEventListener('click', () => {
    nav.style.backgroundColor = '#6890F0';
});

document.getElementById('fire').addEventListener('click', () => {
    nav.style.backgroundColor = '#F08030';
});

document.getElementById('electric').addEventListener('click', () => {
    nav.style.backgroundColor = '#F8D030';
});

document.getElementById('mostrar').addEventListener('click', () => {
    nav.style.backgroundColor = '#78C850';
    listaPokemon.style.display = ''; // 🔹 volvemos al valor original del CSS
    resultado.innerHTML = ''; // limpia el resultado
});



// ---------------- EJERCICIO 2 ----------------
const listaPokemon = document.getElementById('listaPokemon');


const colorPorTipo = {
    normal: '#A8A878', fire: '#F08030', water: '#6890F0', grass: '#78C850',
    electric: '#F8D030', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
    ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
    rock: '#B8A038', ghost: '#705898', dark: '#705848', dragon: '#7038F8',
    steel: '#B8B8D0', fairy: '#F0B6BC'
};


fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
        data.results.forEach(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const detalle = await res.json();


            const tipos = detalle.types.map(t => t.type.name);


            const pokemonDiv = document.createElement('div');
            pokemonDiv.classList.add('pokemon');


            pokemonDiv.innerHTML = `
                <div class="pokemon-imagen">
                    <img src="${detalle.sprites.other['official-artwork'].front_default}" alt="${detalle.name}">
                </div>
                <div class="pokemon-info">
                    <div class="nombre-contenedor">
                        <p class="pokemon-id">#${String(detalle.id).padStart(3,'0')}</p>
                        <h2 class="pokemon-nombre">${detalle.name}</h2>
                    </div>
                    <div class="pokemon-tipos">
                        ${tipos.map(t => `<p class="tipo">${t}</p>`).join('')}
                    </div>
                </div>
            `;


            pokemonDiv.querySelectorAll('.tipo').forEach(t => {
                const tipo = t.textContent.toLowerCase();
                t.style.backgroundColor = colorPorTipo[tipo] || '#ccc';
                t.style.color = 'white';
            });


            listaPokemon.appendChild(pokemonDiv);
        });
    })
    .catch(error => console.error(error));




