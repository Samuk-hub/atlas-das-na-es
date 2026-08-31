// Funções para interagir com as Netlify Functions

const API_URL = '/.netlify/functions';

// Função para carregar curiosidades
async function loadCuriosidades() {
    try {
        const response = await fetch(`${API_URL}/getCuriosidades`);
        const curiosidades = await response.json();
        displayCuriosidades(curiosidades);
    } catch (error) {
        console.error('Erro ao carregar curiosidades:', error);
    }
}

// Função para exibir curiosidades
function displayCuriosidades(curiosidades) {
    const container = document.getElementById('curiosidadesList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (curiosidades.length === 0) {
        container.innerHTML = '<p>Nenhuma curiosidade cadastrada ainda.</p>';
        return;
    }
    
    curiosidades.forEach(curiosidade => {
        const card = document.createElement('div');
        card.className = 'curiosidade-card';
        card.innerHTML = `
            <h3>${curiosidade.titulo}</h3>
            <p><strong>País:</strong> ${curiosidade.pais}</p>
            <p><strong>Categoria:</strong> ${curiosidade.categoria}</p>
            <p>${curiosidade.descricao}</p>
            ${curiosidade.fonte ? `<p><small>Fonte: ${curiosidade.fonte}</small></p>` : ''}
            <button class="btn-delete" onclick="deleteCuriosidade('${curiosidade._id}')">
                Excluir
            </button>
        `;
        container.appendChild(card);
    });
}

// Função para cadastrar curiosidade
async function createCuriosidade(event) {
    event.preventDefault();
    
    const formData = {
        pais: document.getElementById('pais').value,
        categoria: document.getElementById('categoria').value,
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        fonte: document.getElementById('fonte').value
    };
    
    try {
        const response = await fetch(`${API_URL}/createCuriosidade`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Curiosidade cadastrada com sucesso!');
            document.getElementById('curiosidadeForm').reset();
        } else {
            alert('Erro ao cadastrar curiosidade');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar curiosidade');
    }
}

// Função para deletar curiosidade
async function deleteCuriosidade(id) {
    if (!confirm('Tem certeza que deseja excluir esta curiosidade?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/deleteCuriosidade`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        
        if (response.ok) {
            alert('Curiosidade excluída com sucesso!');
            loadCuriosidades();
        } else {
            alert('Erro ao excluir curiosidade');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao excluir curiosidade');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('curiosidadeForm')) {
        document.getElementById('curiosidadeForm').addEventListener('submit', createCuriosidade);
    }
    
    if (document.getElementById('curiosidadesList')) {
        loadCuriosidades();
    }
});