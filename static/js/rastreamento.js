// ========================================
// RASTREAMENTO EM TEMPO REAL
// ========================================

let atualizacaoInterval;

async function atualizarStatus() {
    try {
        const response = await fetch(`/api/status-pedido/${pedidoId}`);
        const data = await response.json();
        
        // Atualizar badge de status
        const statusBadge = document.getElementById('statusBadge');
        statusBadge.textContent = data.status;
        statusBadge.className = `status-badge status-${data.status.toLowerCase().replace(/ /g, '-')}`;
        
        // Atualizar barra de progresso
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${data.progresso}%`;
        
        // Atualizar steps
        const steps = document.querySelectorAll('.step');
        const estados = ['Preparando', 'Saiu para entrega', 'Em trânsito', 'Próximo ao destino', 'Entregue'];
        const statusIndex = estados.indexOf(data.status);
        
        steps.forEach((step, index) => {
            if (index <= statusIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Se entregue, parar atualizações
        if (data.status === 'Entregue') {
            clearInterval(atualizacaoInterval);
            showMessage('Pedido entregue com sucesso! 🎉', 'success');
        }
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
    }
}

// Iniciar atualizações automáticas
atualizarStatus();
atualizacaoInterval = setInterval(atualizarStatus, 5000); // Atualizar a cada 5 segundos

// Limpar intervalo ao sair da página
window.addEventListener('beforeunload', () => {
    if (atualizacaoInterval) {
        clearInterval(atualizacaoInterval);
    }
});
