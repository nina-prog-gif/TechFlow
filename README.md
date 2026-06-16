# 🚀 TechFlow - Delivery de Tecnologia
# Profª Maristela

![TechFlow Logo](https://img.shields.io/badge/TechFlow-Delivery-orange?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0-blue?style=for-the-badge&logo=flask)
![Python](https://img.shields.io/badge/Python-3.8+-green?style=for-the-badge&logo=python)

Sistema completo de delivery de suprimentos de informática com rastreamento em tempo real (simulado).

## 📋 Sobre o Projeto

**TechFlow** é uma plataforma moderna de e-commerce especializada em produtos de tecnologia, desenvolvida com Flask, HTML, CSS e JavaScript. O sistema oferece uma experiência completa de compra online com as seguintes categorias:

- 🖥️ **Hardware** - Processadores, placas de vídeo, memórias, etc.
- 💻 **Software** - Sistemas operacionais, licenças e ferramentas
- 🖨️ **Impressão 3D** - Impressoras, filamentos e resinas
- 🚁 **Drones** - Drones profissionais e recreativos

## ✨ Características Principais

### Interface Moderna
- ✅ Design responsivo para todos os dispositivos
- ✅ Tema claro e escuro para acessibilidade
- ✅ Animações e efeitos visuais sofisticados
- ✅ Rede neural animada no fundo
- ✅ Cores: Preto, branco, azul escuro (#1e3a8a) e laranja (#ff6b35)

### Funcionalidades
- ✅ Sistema completo de cadastro e login
- ✅ Catálogo de produtos com filtros por categoria
- ✅ Carrinho de compras com gerenciamento de quantidade
- ✅ Sistema de pedidos com banco de dados
- ✅ **Rastreamento em tempo real (simulado)** da entrega
- ✅ Histórico de pedidos do usuário
- ✅ Criptografia de senhas

### Tecnologias Utilizadas

**Backend:**
- Python 3.8+
- Flask 3.0
- Flask-SQLAlchemy (ORM)
- SQLite (Banco de dados)
- Werkzeug (Segurança)

**Frontend:**
- HTML5
- CSS3 (Variáveis CSS, Grid, Flexbox, Animações)
- JavaScript (ES6+)
- Font Awesome (Ícones)

## 📁 Estrutura do Projeto

```
ProjetoWeb/
│
├── app.py                      # Aplicação Flask principal
├── requirements.txt            # Dependências Python
├── Leia-me.txt                # Requisitos originais
├── README.md                   # Este arquivo
│
├── static/                     # Arquivos estáticos
│   ├── css/
│   │   └── style.css          # Estilos com tema claro/escuro
│   └── js/
│       ├── main.js            # Scripts principais
│       ├── auth.js            # Autenticação
│       ├── loja.js            # Loja e produtos
│       ├── carrinho.js        # Carrinho de compras
│       └── rastreamento.js    # Rastreamento em tempo real
│
└── templates/                  # Templates HTML
    ├── index.html             # Página inicial
    ├── cadastro.html          # Cadastro de usuário
    ├── login.html             # Login
    ├── loja.html              # Catálogo de produtos
    ├── carrinho.html          # Carrinho de compras
    ├── rastreamento.html      # Rastreamento de pedido
    └── meus_pedidos.html      # Histórico de pedidos
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Python 3.8 ou superior instalado
- pip (gerenciador de pacotes Python)

### Passo 1: Instalar Dependências

Abra o terminal na pasta do projeto e execute:

```bash
pip install -r requirements.txt
```

### Passo 2: Executar a Aplicação

```bash
python app.py
```

### Passo 3: Acessar no Navegador

Abra seu navegador e acesse:

```
http://localhost:5000
```

## 🎯 Como Usar o Sistema

### 1. Criar uma Conta
- Acesse a página inicial
- Clique em "Cadastre-se Grátis"
- Preencha: Nome, Sobrenome, E-mail e Senha
- Clique em "Cadastrar"

### 2. Fazer Login
- Acesse a página de login
- Entre com seu e-mail e senha
- Clique em "Entrar"

### 3. Explorar Produtos
- Na loja, navegue pelas categorias
- Use os filtros: Todos, Hardware, Software, Impressão 3D, Drones
- Clique no ícone de carrinho para adicionar produtos

### 4. Finalizar Compra
- Acesse o carrinho
- Ajuste as quantidades ou remova itens
- Clique em "Finalizar Compra"

### 5. Rastrear Pedido
- Após finalizar, você será redirecionado para o rastreamento
- Veja o status em tempo real da sua entrega
- Estados: Preparando → Saiu para entrega → Em trânsito → Próximo ao destino → Entregue

### 6. Histórico de Pedidos
- Acesse "Meus Pedidos" no menu
- Visualize todos os seus pedidos anteriores
- Clique em "Rastrear Pedido" para ver o status

## 🎨 Temas e Acessibilidade

O sistema oferece dois temas:

**Tema Claro (padrão)**
- Fundo branco
- Texto escuro
- Ideal para ambientes bem iluminados

**Tema Escuro**
- Fundo preto
- Texto claro
- Reduz fadiga visual em ambientes escuros

Para alternar entre os temas, clique no ícone de lua/sol no canto superior direito.

## 🗄️ Banco de Dados

O sistema usa SQLite com as seguintes tabelas:

- **Usuario** - Dados dos usuários cadastrados
- **Produto** - Catálogo de produtos
- **Pedido** - Informações dos pedidos
- **ItemPedido** - Itens de cada pedido

Na primeira execução, o banco é criado automaticamente e populado com produtos de exemplo.

## 🔐 Segurança

- ✅ Senhas criptografadas com hash (Werkzeug)
- ✅ Sessões seguras do Flask
- ✅ Validação de dados no frontend e backend
- ✅ Proteção contra SQL Injection (SQLAlchemy ORM)

## 📊 Simulação de Rastreamento

O rastreamento em tempo real é simulado com base no tempo decorrido desde o pedido:

- **0-2 min**: Preparando
- **2-3 min**: Saiu para entrega
- **3-4 min**: Em trânsito
- **4-5 min**: Próximo ao destino
- **5+ min**: Entregue

A página de rastreamento atualiza automaticamente a cada 5 segundos.

## 🎓 Desenvolvido Para

Projeto acadêmico para a disciplina de **Desenvolvimento Web** utilizando:
- Flask (Backend)
- HTML/CSS/JavaScript (Frontend)
- SQLite (Banco de Dados)

## 👨‍💻 Funcionalidades Técnicas

### Backend (Flask)
- Rotas RESTful
- ORM com SQLAlchemy
- Autenticação com sessões
- API JSON para produtos e status
- Relacionamentos entre tabelas

### Frontend
- Fetch API para requisições assíncronas
- LocalStorage para carrinho
- Canvas API para animação da rede neural
- Intersection Observer para animações
- CSS Grid e Flexbox para layout responsivo
- Variáveis CSS para temas

## 🌟 Destaques Visuais

- 🎨 Gradientes e efeitos de brilho
- 🌊 Animações suaves e transições
- 🔵 Rede neural animada no fundo
- 📱 100% Responsivo
- ♿ Acessível com temas claro/escuro
- 🎯 Feedback visual em todas as ações

## 📝 Notas de Desenvolvimento

### Produtos Iniciais
O sistema vem com 14 produtos pré-cadastrados:
- 5 itens de Hardware
- 3 itens de Software
- 3 itens de Impressão 3D
- 3 itens de Drones

### Status do Pedido
Os status mudam automaticamente na simulação, mas em produção seria integrado com sistema real de logística.

## 🐛 Resolução de Problemas

**Erro ao instalar dependências:**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**Banco de dados não criado:**
- Delete o arquivo `techdelivery.db` (se existir)
- Execute `python app.py` novamente

**Porta 5000 em uso:**
- Altere a porta no final de `app.py`:
```python
app.run(debug=True, port=5001)
```

## 📜 Licença

Projeto desenvolvido para fins educacionais.

## 🤝 Contribuições

Este é um projeto acadêmico. Sugestões e melhorias são bem-vindas!

---

**TechFlow** - Tecnologia ao seu alcance em tempo real! 🚀

*Desenvolvido com ❤️ usando Flask, HTML, CSS e JavaScript*
