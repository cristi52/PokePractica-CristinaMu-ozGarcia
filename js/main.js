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