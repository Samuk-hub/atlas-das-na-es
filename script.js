// Função para carregar bandeiras
function getFlagUrl(countryCode) {
    return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
}

// Função para exibir países
function displayCountries(countriesToShow) {
    const grid = document.getElementById('countriesGrid');
    grid.innerHTML = '';
    
    countriesToShow.forEach(country => {
        const card = document.createElement('div');
        card.className = 'country-card';
        card.onclick = () => showCountryDetails(country);
        
        card.innerHTML = `
            <img src="${getFlagUrl(country.code)}" 
                 alt="Bandeira de ${country.name}" 
                 class="country-flag"
                 onerror="this.src='https://via.placeholder.com/320x180/667eea/ffffff?text=${country.name}'">
            <h3>${country.name}</h3>
            <p>${country.continent}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
        `;
        
        grid.appendChild(card);
    });
    
    document.getElementById('displayedCountries').textContent = countriesToShow.length;
}

// Função para mostrar detalhes do país
function showCountryDetails(country) {
    const modal = document.getElementById('modal');
    const modalDetails = document.getElementById('modalCountryDetails');
    
    modalDetails.innerHTML = `
        <img src="${getFlagUrl(country.code)}" 
             alt="Bandeira de ${country.name}" 
             class="modal-flag"
             onerror="this.src='https://via.placeholder.com/600x400/667eea/ffffff?text=${country.name}'">
        <h2>${country.name}</h2>
        <div class="modal-details">
            <p><strong>🌍 Continente:</strong> ${country.continent}</p>
            <p><strong>🏙️ Capital:</strong> ${country.capital}</p>
            <p><strong>🔤 Código ISO:</strong> ${country.code}</p>
            <p><strong>🇺🇳 Membro da ONU:</strong> Sim</p>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Função para filtrar países
function filterCountries() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const continent = document.getElementById('continentFilter').value;
    
    const filtered = countries.filter(country => {
        const matchesSearch = country.name.toLowerCase().includes(searchTerm) ||
                             country.capital.toLowerCase().includes(searchTerm);
        const matchesContinent = continent === 'all' || country.continent === continent;
        
        return matchesSearch && matchesContinent;
    });
    
    displayCountries(filtered);
}

// Função para resetar filtros
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('continentFilter').value = 'all';
    displayCountries(countries);
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', filterCountries);
document.getElementById('continentFilter').addEventListener('change', filterCountries);

// Fechar modal
document.querySelector('.close').onclick = function() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Inicializar
document.getElementById('totalCountries').textContent = countries.length;
displayCountries(countries);

// Ordenar países alfabeticamente
countries.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));