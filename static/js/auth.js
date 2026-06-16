// ========================================
// AUTENTICAÇÃO - CADASTRO
// ========================================

const cadastroForm = document.getElementById('cadastroForm');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(cadastroForm);
        const senha = formData.get('senha');
        
        // Validação de senha
        if (senha.length < 6) {
            showMessage('A senha deve ter no mínimo 6 caracteres', 'error');
            return;
        }
        
        try {
            const response = await fetch('/cadastrar', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                showMessage(data.message, 'success');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                showMessage(data.message, 'error');
            }
        } catch (error) {
            showMessage('Erro ao realizar cadastro. Tente novamente.', 'error');
        }
    });
}

// ========================================
// AUTENTICAÇÃO - LOGIN
// ========================================

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        
        try {
            const response = await fetch('/autenticar', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                showMessage(data.message, 'success');
                setTimeout(() => {
                    window.location.href = '/loja';
                }, 1500);
            } else {
                showMessage(data.message, 'error');
            }
        } catch (error) {
            showMessage('Erro ao realizar login. Tente novamente.', 'error');
        }
    });
}

// ========================================
// TOGGLE DE SENHA
// ========================================

function togglePassword() {
    const senhaInput = document.getElementById('senha');
    const toggleBtn = document.querySelector('.toggle-password');
    const icon = toggleBtn.querySelector('i');
    
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        senhaInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}
