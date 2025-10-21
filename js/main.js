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



// ---------------- EJERCICIO 3 ----------------
const buscadorContainer = document.createElement('div');
buscadorContainer.style.display = 'flex';
buscadorContainer.style.justifyContent = 'center';
buscadorContainer.style.alignItems = 'center';
buscadorContainer.style.gap = '10px';
buscadorContainer.style.margin = '20px auto';
buscadorContainer.style.flexWrap = 'wrap';
buscadorContainer.style.textAlign = 'center';


const inputBuscar = document.createElement('input');
inputBuscar.id = 'inputBuscar';
inputBuscar.placeholder = ' Buscar Pokémon por nombre o ID';
inputBuscar.style.padding = '10px';
inputBuscar.style.border = '2px solid #ccc';
inputBuscar.style.borderRadius = '8px';
inputBuscar.style.width = '250px';
inputBuscar.style.fontSize = '16px';
inputBuscar.style.outline = 'none';
inputBuscar.style.transition = '0.3s';
inputBuscar.addEventListener('focus', () => inputBuscar.style.borderColor = '#78C850');
inputBuscar.addEventListener('blur', () => inputBuscar.style.borderColor = '#ccc');


const btnBuscar = document.createElement('button');
btnBuscar.id = 'btnBuscar';
btnBuscar.textContent = 'Buscar';
btnBuscar.style.padding = '10px 16px';
btnBuscar.style.backgroundColor = '#78C850';
btnBuscar.style.color = 'white';
btnBuscar.style.border = 'none';
btnBuscar.style.borderRadius = '8px';
btnBuscar.style.cursor = 'pointer';
btnBuscar.style.fontWeight = 'bold';
btnBuscar.style.transition = '0.3s';
btnBuscar.addEventListener('mouseenter', () => btnBuscar.style.backgroundColor = '#5aa639');
btnBuscar.addEventListener('mouseleave', () => btnBuscar.style.backgroundColor = '#78C850');


const resultado = document.createElement('div');
resultado.id = 'resultado';
resultado.style.marginTop = '40px';
resultado.style.textAlign = 'center';


buscadorContainer.appendChild(inputBuscar);
buscadorContainer.appendChild(btnBuscar);


const todosDiv = document.getElementById('todos');
const main = document.querySelector('main');
main.insertBefore(buscadorContainer, todosDiv);
main.insertBefore(resultado, todosDiv);




// ---------------- busqueda ----------------
async function buscarPokemon() {
    const nombre = inputBuscar.value.toLowerCase().trim();


    if (!nombre) {
        resultado.innerHTML = '';
        listaPokemon.style.display = ''; 
        return;
    }


    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!res.ok) throw new Error('Pokémon no encontrado');
        const pokemon = await res.json();


        const tipos = pokemon.types.map(t => t.type.name);


        listaPokemon.style.display = 'none'; 


        resultado.innerHTML = `
            <div class="pokemon" style="margin:auto; display:inline-block;">
                <div class="pokemon-imagen">
                    <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" style="width:200px;">
                </div>
                <div class="pokemon-info">
                    <div class="nombre-contenedor">
                        <p class="pokemon-id">#${String(pokemon.id).padStart(3,'0')}</p>
                        <h2 class="pokemon-nombre" style="text-transform:uppercase;">${pokemon.name}</h2>
                    </div>
                    <div class="pokemon-tipos">
                        ${tipos.map(t => `<p class="tipo" style="padding:5px 10px; border-radius:10px; color:white; display:inline-block; margin:2px;">${t}</p>`).join('')}
                    </div>
                    <p>Altura: ${pokemon.height} | Peso: ${pokemon.weight}</p>
                </div>
            </div>
        `;


        resultado.querySelectorAll('.tipo').forEach(t => {
            const tipo = t.textContent.toLowerCase();
            t.style.backgroundColor = colorPorTipo[tipo] || '#ccc';
        });


    } catch (err) {
        resultado.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}


btnBuscar.addEventListener('click', buscarPokemon);
inputBuscar.addEventListener('keypress', e => {
    if (e.key === 'Enter') buscarPokemon();
});





