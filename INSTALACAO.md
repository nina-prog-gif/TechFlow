# 🚀 GUIA RÁPIDO DE INSTALAÇÃO E USO - TechFlow

## ⚡ Início Rápido (3 passos)

### 1️⃣ Instalar Dependências
Abra o terminal (PowerShell ou CMD) na pasta do projeto e execute:
```
pip install -r requirements.txt
```

### 2️⃣ Executar o Sistema
```
python app.py
```

### 3️⃣ Acessar no Navegador
Abra seu navegador em:
```
http://localhost:5000
```

---

## 📖 COMO USAR O SISTEMA

### Primeiro Acesso

1. **Criar Conta**
   - Clique em "Cadastre-se Grátis"
   - Preencha seus dados (nome, sobrenome, email e senha)
   - Senha deve ter no mínimo 6 caracteres

2. **Fazer Login**
   - Entre com seu email e senha
   - Você será redirecionado para a loja

### Comprando Produtos

3. **Navegar na Loja**
   - Use os filtros para ver categorias específicas:
     * Todos os produtos
     * Hardware (processadores, placas, memórias)
     * Software (Windows, Office, Adobe)
     * Impressão 3D (impressoras e filamentos)
     * Drones (DJI e acessórios)

4. **Adicionar ao Carrinho**
   - Clique no ícone de carrinho em cada produto
   - Um contador aparecerá no ícone do carrinho no menu

5. **Finalizar Compra**
   - Clique no carrinho no menu superior
   - Ajuste quantidades com os botões + e -
   - Remova itens com o ícone de lixeira
   - Clique em "Finalizar Compra"

6. **Rastrear Entrega**
   - Após finalizar, veja o rastreamento em tempo real
   - A página atualiza automaticamente a cada 5 segundos
   - Acompanhe: Preparando → Saiu para entrega → Em trânsito → Próximo ao destino → Entregue
   - *A simulação leva 5 minutos para completar*

7. **Ver Histórico**
   - Clique em "Meus Pedidos" para ver todos os pedidos
   - Clique em "Rastrear Pedido" para acompanhar qualquer pedido

---

## 🎨 FUNCIONALIDADES EXTRAS

### Tema Claro/Escuro
- Clique no ícone de lua/sol no canto superior direito
- Sua preferência é salva automaticamente

### Responsividade
- Funciona perfeitamente em celulares, tablets e desktops

---

## ❓ PROBLEMAS COMUNS

### "Não encontra o módulo Flask"
```
pip install Flask Flask-SQLAlchemy
```

### "Porta 5000 já em uso"
Edite a última linha do arquivo `app.py`:
```python
app.run(debug=True, port=5001)
```
E acesse: http://localhost:5001

### "Email já cadastrado"
Use outro email ou faça login com o email existente

---

## 📊 DADOS PRÉ-CADASTRADOS

O sistema já vem com 14 produtos cadastrados:

**Hardware:**
- Placa de Vídeo RTX 4090 - R$ 12.999,99
- Processador Intel i9-14900K - R$ 3.499,99
- Memória RAM 32GB DDR5 - R$ 899,99
- SSD NVMe 2TB - R$ 799,99
- Placa Mãe Z790 - R$ 2.199,99

**Software:**
- Windows 11 Pro - R$ 899,00
- Microsoft Office 365 - R$ 349,00
- Adobe Creative Cloud - R$ 2.499,00

**Impressão 3D:**
- Impressora 3D Creality Ender-3 V3 - R$ 1.899,99
- Filamento PLA 1kg - R$ 89,99
- Resina UV 1L - R$ 249,99

**Drones:**
- DJI Mini 4 Pro - R$ 4.999,99
- DJI Mavic 3 Pro - R$ 12.999,99
- Bateria Extra - R$ 599,99

---

## 🎯 RECURSOS VISUAIS

✨ **Efeitos Especiais:**
- Rede neural animada no fundo de todas as páginas
- Transições suaves entre páginas
- Animações ao passar o mouse nos elementos
- Contador animado de estatísticas na página inicial
- Barra de progresso animada no rastreamento

🎨 **Design:**
- Cores principais: Laranja (#ff6b35) e Azul Escuro (#1e3a8a)
- Tema claro: Fundo branco com textos escuros
- Tema escuro: Fundo preto com textos claros
- Gradientes e efeitos de brilho

---

## 💡 DICAS

1. **Teste o rastreamento**: Faça um pedido e deixe a página de rastreamento aberta por 5 minutos para ver todas as etapas

2. **Múltiplos produtos**: Adicione vários produtos ao carrinho para ver o sistema de quantidade funcionando

3. **Filtros**: Use os filtros na loja para encontrar produtos rapidamente

4. **Tema escuro**: Experimente o tema escuro para reduzir fadiga visual

5. **Mobile**: Teste no celular - o site é totalmente responsivo!

---

## 🔒 SEGURANÇA

- Todas as senhas são criptografadas
- Sessões seguras do Flask
- Dados armazenados localmente em SQLite

---

## 🆘 SUPORTE

**Problemas com a instalação?**
1. Certifique-se que Python 3.8+ está instalado: `python --version`
2. Atualize o pip: `pip install --upgrade pip`
3. Instale as dependências novamente

**Problemas no navegador?**
1. Limpe o cache do navegador
2. Use navegadores modernos (Chrome, Firefox, Edge)
3. Habilite JavaScript

---

## 📞 INFORMAÇÕES DO PROJETO

**Nome:** TechFlow - Delivery de Tecnologia
**Tecnologias:** Flask, HTML, CSS, JavaScript, SQLite
**Propósito:** Projeto acadêmico de Desenvolvimento Web

**Funcionalidades principais:**
✅ Cadastro e Login
✅ Catálogo de produtos com filtros
✅ Carrinho de compras
✅ Finalização de pedidos
✅ Rastreamento em tempo real (simulado)
✅ Histórico de pedidos
✅ Tema claro/escuro
✅ Design responsivo

---

🎉 **Pronto para começar! Boa sorte com o projeto!** 🎉

Para mais detalhes, consulte o arquivo README.md
