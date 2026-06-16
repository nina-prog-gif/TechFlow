// ========================================
// CARREGAR E EXIBIR PRODUTOS
// ========================================

let todosOsProdutos = [];

async function carregarProdutos() {
    try {
        const response = await fetch('/api/produtos');
        todosOsProdutos = await response.json();
        exibirProdutos(todosOsProdutos);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function exibirProdutos(produtos) {
    const grid = document.getElementById('produtosGrid');
    if (!grid) return;
    
    if (produtos.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;" role="status">Nenhum produto encontrado.</p>';
        announceToScreenReader('Nenhum produto encontrado');
        return;
    }
    
    grid.innerHTML = produtos.map(produto => `
        <div class="produto-card" data-categoria="${produto.categoria}" role="listitem">
            <div class="produto-imagem" aria-hidden="true">
                <i class="${getCategoriaIcon(produto.categoria)}"></i>
            </div>
            <div class="produto-info">
                <span class="produto-categoria">${getCategoriaLabel(produto.categoria)}</span>
                <h3 class="produto-nome">${produto.nome}</h3>
                <p class="produto-descricao">${produto.descricao}</p>
                <div class="produto-footer">
                    <span class="produto-preco" aria-label="Pre\u00e7o: ${formatCurrency(produto.preco)}">${formatCurrency(produto.preco)}</span>
                    <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})" aria-label="Adicionar ${produto.nome} ao carrinho">
                        <i class="fas fa-cart-plus" aria-hidden="true"></i>
                        <span class="sr-only">Adicionar ao carrinho</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Anunciar quantidade de produtos
    announceToScreenReader(`${produtos.length} ${produtos.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`);
}

function getCategoriaIcon(categoria) {
    const icons = {
        'hardware': 'fas fa-microchip',
        'software': 'fas fa-laptop-code',
        'impressao3d': 'fas fa-cube',
        'drone': 'fas fa-helicopter'
    };
    return icons[categoria] || 'fas fa-box';
}

function getCategoriaLabel(categoria) {
    const labels = {
        'hardware': 'Hardware',
        'software': 'Software',
        'impressao3d': 'Impressão 3D',
        'drone': 'Drone'
    };
    return labels[categoria] || categoria;
}

// ========================================
// FILTROS
// ========================================

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Atualizar botão ativo
        filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        
        // Filtrar produtos
        const filter = btn.getAttribute('data-filter');
        const filterLabel = btn.textContent.trim();
        
        if (filter === 'all') {
            exibirProdutos(todosOsProdutos);
        } else {
            const produtosFiltrados = todosOsProdutos.filter(p => p.categoria === filter);
            exibirProdutos(produtosFiltrados);
        }
        
        // Anunciar filtro aplicado
        announceToScreenReader(`Filtro aplicado: ${filterLabel}`);
    });
});

// ========================================
// ADICIONAR AO CARRINHO
// ========================================

function adicionarAoCarrinho(produtoId) {
    const produto = todosOsProdutos.find(p => p.id === produtoId);
    if (!produto) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar se o produto já está no carrinho
    const itemExistente = cart.find(item => item.id === produtoId);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        cart.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            categoria: produto.categoria,
            quantidade: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    
    // Feedback visual e para leitores de tela
    showMessage(`${produto.nome} adicionado ao carrinho!`, 'success');
    announceToScreenReader(`${produto.nome} adicionado ao carrinho. Total de itens: ${cart.reduce((sum, item) => sum + item.quantidade, 0)}`);
}

// Carregar produtos ao iniciar
carregarProdutos();
