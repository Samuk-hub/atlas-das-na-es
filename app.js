// Lista de países com emojis de bandeiras
const countries = [
    { name: "Brasil", flag: "🇧🇷", capital: "Brasília", region: "América do Sul" },
    { name: "Estados Unidos", flag: "🇺🇸", capital: "Washington D.C.", region: "América do Norte" },
    { name: "Japão", flag: "🇯🇵", capital: "Tóquio", region: "Ásia" },
    { name: "Alemanha", flag: "🇩🇪", capital: "Berlim", region: "Europa" },
    { name: "França", flag: "🇫🇷", capital: "Paris", region: "Europa" },
    { name: "Itália", flag: "🇮🇹", capital: "Roma", region: "Europa" },
    { name: "Portugal", flag: "🇵🇹", capital: "Lisboa", region: "Europa" },
    { name: "Espanha", flag: "🇪🇸", capital: "Madri", region: "Europa" },
    { name: "Reino Unido", flag: "🇬🇧", capital: "Londres", region: "Europa" },
    { name: "Canadá", flag: "🇨🇦", capital: "Ottawa", region: "América do Norte" },
    { name: "México", flag: "🇲🇽", capital: "Cidade do México", region: "América do Norte" },
    { name: "Argentina", flag: "🇦🇷", capital: "Buenos Aires", region: "América do Sul" },
    { name: "Chile", flag: "🇨🇱", capital: "Santiago", region: "América do Sul" },
    { name: "Colômbia", flag: "🇨🇴", capital: "Bogotá", region: "América do Sul" },
    { name: "Peru", flag: "🇵🇪", capital: "Lima", region: "América do Sul" },
    { name: "China", flag: "🇨🇳", capital: "Pequim", region: "Ásia" },
    { name: "Índia", flag: "🇮🇳", capital: "Nova Delhi", region: "Ásia" },
    { name: "Coreia do Sul", flag: "🇰🇷", capital: "Seul", region: "Ásia" },
    { name: "Austrália", flag: "🇦🇺", capital: "Camberra", region: "Oceania" },
    { name: "Nova Zelândia", flag: "🇳🇿", capital: "Wellington", region: "Oceania" },
    { name: "África do Sul", flag: "🇿🇦", capital: "Pretória", region: "África" },
    { name: "Egito", flag: "🇪🇬", capital: "Cairo", region: "África" },
    { name: "Nigéria", flag: "🇳🇬", capital: "Abuja", region: "África" },
    { name: "Quênia", flag: "🇰🇪", capital: "Nairóbi", region: "África" },
    { name: "Rússia", flag: "🇷🇺", capital: "Moscou", region: "Europa/Ásia" },
    { name: "Suécia", flag: "🇸🇪", capital: "Estocolmo", region: "Europa" },
    { name: "Noruega", flag: "🇳🇴", capital: "Oslo", region: "Europa" },
    { name: "Dinamarca", flag: "🇩🇰", capital: "Copenhague", region: "Europa" },
    { name: "Finlândia", flag: "🇫🇮", capital: "Helsinque", region: "Europa" },
    { name: "Grécia", flag: "🇬🇷", capital: "Atenas", region: "Europa" }
];

// Função para popular o select de países
function populateCountrySelect() {
    const select = document.getElementById('pais');
    if (select) {
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name;
            option.textContent = `${country.flag} ${country.name}`;
            select.appendChild(option);
        });
    }
}

// Função para carregar países em destaque
function loadFeaturedCountries() {
    const featuredContainer = document.getElementById('featuredCountries');
    if (featuredContainer) {
        const featured = countries.slice(0, 6);
        featured.forEach(country => {
            const card = createCountryCard(country);
            featuredContainer.appendChild(card);
        });
    }
}

function createCountryCard(country) {
    const card = document.createElement('div');
    card.className = 'country-card';
    card.innerHTML = `
        <div class="country-flag">${country.flag}</div>
        <div class="country-name">${country.name}</div>
        <div class="country-info">
            <small>Capital: ${country.capital}</small><br>
            <small>Região: ${country.region}</small>
        </div>
    `;
    return card;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    populateCountrySelect();
    loadFeaturedCountries();
});