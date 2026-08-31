// Script para a página de países
const countriesData = [
    { name: "Brasil", flag: "🇧🇷", capital: "Brasília", region: "América do Sul", population: "213 milhões" },
    { name: "Estados Unidos", flag: "🇺🇸", capital: "Washington D.C.", region: "América do Norte", population: "331 milhões" },
    // ... (inclua todos os países da lista anterior com informações adicionais)
];

function displayCountries(countries) {
    const container = document.getElementById('countriesList');
    container.innerHTML = '';
    
    countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'country-card';
        card.innerHTML = `
            <div class="country-flag">${country.flag}</div>
            <div class="country-name">${country.name}</div>
            <div class="country-info">
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Região:</strong> ${country.region}</p>
                <p><strong>População:</strong> ${country.population}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayCountries(countriesData);
    
    const searchInput = document.getElementById('searchCountry');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = countriesData.filter(country => 
            country.name.toLowerCase().includes(searchTerm) ||
            country.capital.toLowerCase().includes(searchTerm)
        );
        displayCountries(filtered);
    });
});