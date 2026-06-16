// ========================================
// CARRINHO DE COMPRAS
// ========================================

let carrinho = [];

function carregarCarrinho() {
    carrinho = JSON.parse(localStorage.getItem('cart')) || [];
    exibirCarrinho();
    atualizarResumo();
}

function exibirCarrinho() {
    const carrinhoItems = document.getElementById('carrinhoItems');
    const carrinhoVazio = document.getElementById('carrinhoVazio');
    
    if (!carrinhoItems) return;
    
    if (carrinho.length === 0) {
        carrinhoItems.style.display = 'none';
        carrinhoVazio.style.display = 'flex';
        document.querySelector('.carrinho-summary').style.display = 'none';
        return;
    }
    
    carrinhoItems.style.display = 'flex';
    carrinhoVazio.style.display = 'none';
    document.querySelector('.carrinho-summary').style.display = 'block';
    
    carrinhoItems.innerHTML = carrinho.map((item, index) => `
        <div class="carrinho-item">
            <div class="item-imagem">
                <i class="${getCategoriaIcon(item.categoria)}"></i>
            </div>
            <div class="item-detalhes">
                <h3 class="item-nome">${item.nome}</h3>
                <p class="item-preco">${formatCurrency(item.preco)}</p>
            </div>
            <div class="item-controles">
                <div class="quantidade-controles">
                    <button class="btn-quantidade" onclick="alterarQuantidade(${index}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantidade">${item.quantidade}</span>
                    <button class="btn-quantidade" onclick="alterarQuantidade(${index}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="btn-remover" onclick="removerItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
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

function alterarQuantidade(index, delta) {
    carrinho[index].quantidade += delta;
    
    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }
    
    salvarCarrinho();
    exibirCarrinho();
    atualizarResumo();
}

function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    exibirCarrinho();
    atualizarResumo();
}

function salvarCarrinho() {
    localStorage.setItem('cart', JSON.stringify(carrinho));
    updateCartBadge();
}

function atualizarResumo() {
    const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('total').textContent = formatCurrency(subtotal);
}

// ========================================
// FINALIZAR PEDIDO
// ========================================

const finalizarBtn = document.getElementById('finalizarBtn');
if (finalizarBtn) {
    finalizarBtn.addEventListener('click', async () => {
        if (carrinho.length === 0) {
            showMessage('Seu carrinho está vazio!', 'error');
            return;
        }
        
        finalizarBtn.disabled = true;
        finalizarBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        
        try {
            const response = await fetch('/finalizar-pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    itens: carrinho
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Limpar carrinho
                localStorage.removeItem('cart');
                updateCartBadge();
                
                // Mostrar mensagem e redirecionar
                showMessage(data.message, 'success');
                
                setTimeout(() => {
                    window.location.href = `/rastreamento/${data.pedido_id}`;
                }, 2000);
            } else {
                showMessage(data.message, 'error');
                finalizarBtn.disabled = false;
                finalizarBtn.innerHTML = '<i class="fas fa-check"></i> Finalizar Compra';
            }
        } catch (error) {
            showMessage('Erro ao finalizar pedido. Tente novamente.', 'error');
            finalizarBtn.disabled = false;
            finalizarBtn.innerHTML = '<i class="fas fa-check"></i> Finalizar Compra';
        }
    });
}

// Carregar carrinho ao iniciar
carregarCarrinho();
