from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os
import random

app = Flask(__name__)
app.secret_key = 'chave-secreta-muito-segura-123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///techdelivery.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    sobrenome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(200), nullable=False)
    pedidos = db.relationship('Pedido', backref='usuario', lazy=True)

class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    preco = db.Column(db.Float, nullable=False)
    categoria = db.Column(db.String(50), nullable=False)
    imagem = db.Column(db.String(200), nullable=False)
    estoque = db.Column(db.Integer, default=10)

class Pedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    data = db.Column(db.DateTime, default=datetime.utcnow)
    total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='Preparando')
    itens = db.relationship('ItemPedido', backref='pedido', lazy=True)

class ItemPedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedido.id'), nullable=False)
    produto_id = db.Column(db.Integer, db.ForeignKey('produto.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    preco = db.Column(db.Float, nullable=False)
    produto = db.relationship('Produto')

# Rotas
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cadastro')
def cadastro():
    return render_template('cadastro.html')

@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    nome = request.form['nome']
    sobrenome = request.form['sobrenome']
    email = request.form['email']
    senha = request.form['senha']
    
    usuario_existe = Usuario.query.filter_by(email=email).first()
    if usuario_existe:
        return jsonify({'success': False, 'message': 'E-mail já cadastrado'})
    
    senha_hash = generate_password_hash(senha)
    novo_usuario = Usuario(nome=nome, sobrenome=sobrenome, email=email, senha=senha_hash)
    
    db.session.add(novo_usuario)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Cadastro realizado com sucesso!'})

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/autenticar', methods=['POST'])
def autenticar():
    email = request.form['email']
    senha = request.form['senha']
    
    usuario = Usuario.query.filter_by(email=email).first()
    
    if usuario and check_password_hash(usuario.senha, senha):
        session['usuario_id'] = usuario.id
        session['nome'] = usuario.nome
        return jsonify({'success': True, 'message': 'Login realizado com sucesso!'})
    
    return jsonify({'success': False, 'message': 'E-mail ou senha incorretos'})

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/loja')
def loja():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))
    
    produtos = Produto.query.all()
    return render_template('loja.html', produtos=produtos)

@app.route('/api/produtos')
def api_produtos():
    produtos = Produto.query.all()
    return jsonify([{
        'id': p.id,
        'nome': p.nome,
        'descricao': p.descricao,
        'preco': p.preco,
        'categoria': p.categoria,
        'imagem': p.imagem,
        'estoque': p.estoque
    } for p in produtos])

@app.route('/carrinho')
def carrinho():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))
    return render_template('carrinho.html')

@app.route('/finalizar-pedido', methods=['POST'])
def finalizar_pedido():
    if 'usuario_id' not in session:
        return jsonify({'success': False, 'message': 'Usuário não autenticado'})
    
    dados = request.get_json()
    itens = dados.get('itens', [])
    
    if not itens:
        return jsonify({'success': False, 'message': 'Carrinho vazio'})
    
    total = sum(item['preco'] * item['quantidade'] for item in itens)
    
    novo_pedido = Pedido(usuario_id=session['usuario_id'], total=total)
    db.session.add(novo_pedido)
    db.session.commit()
    
    for item in itens:
        item_pedido = ItemPedido(
            pedido_id=novo_pedido.id,
            produto_id=item['id'],
            quantidade=item['quantidade'],
            preco=item['preco']
        )
        db.session.add(item_pedido)
    
    db.session.commit()
    
    return jsonify({'success': True, 'pedido_id': novo_pedido.id, 'message': 'Pedido realizado com sucesso!'})

@app.route('/rastreamento/<int:pedido_id>')
def rastreamento(pedido_id):
    if 'usuario_id' not in session:
        return redirect(url_for('login'))
    
    pedido = Pedido.query.get_or_404(pedido_id)
    
    if pedido.usuario_id != session['usuario_id']:
        return redirect(url_for('loja'))
    
    return render_template('rastreamento.html', pedido=pedido)

@app.route('/api/status-pedido/<int:pedido_id>')
def api_status_pedido(pedido_id):
    pedido = Pedido.query.get_or_404(pedido_id)
    
    # Simulação de acompanhamento em tempo real
    estados = ['Preparando', 'Saiu para entrega', 'Em trânsito', 'Próximo ao destino', 'Entregue']
    tempo_decorrido = (datetime.utcnow() - pedido.data).total_seconds()
    
    if tempo_decorrido > 300:  # 5 minutos
        status = 'Entregue'
    elif tempo_decorrido > 240:
        status = 'Próximo ao destino'
    elif tempo_decorrido > 180:
        status = 'Em trânsito'
    elif tempo_decorrido > 120:
        status = 'Saiu para entrega'
    else:
        status = 'Preparando'
    
    pedido.status = status
    db.session.commit()
    
    return jsonify({
        'status': status,
        'progresso': min(int((tempo_decorrido / 300) * 100), 100)
    })

@app.route('/meus-pedidos')
def meus_pedidos():
    if 'usuario_id' not in session:
        return redirect(url_for('login'))
    
    pedidos = Pedido.query.filter_by(usuario_id=session['usuario_id']).order_by(Pedido.data.desc()).all()
    return render_template('meus_pedidos.html', pedidos=pedidos)

def inicializar_produtos():
    if Produto.query.count() == 0:
        produtos = [
            # Hardware
            Produto(nome='Placa de Vídeo RTX 4090', descricao='GPU de alta performance para gaming e renderização', preco=12999.99, categoria='hardware', imagem='gpu.jpg', estoque=5),
            Produto(nome='Processador Intel i9-14900K', descricao='Processador de última geração com 24 núcleos', preco=3499.99, categoria='hardware', imagem='cpu.jpg', estoque=10),
            Produto(nome='Memória RAM 32GB DDR5', descricao='Kit 2x16GB 6000MHz RGB', preco=899.99, categoria='hardware', imagem='ram.jpg', estoque=15),
            Produto(nome='SSD NVMe 2TB', descricao='Armazenamento ultra rápido Gen 4', preco=799.99, categoria='hardware', imagem='ssd.jpg', estoque=20),
            Produto(nome='Placa Mãe Z790', descricao='Chipset Intel Z790 com Wi-Fi 6E', preco=2199.99, categoria='hardware', imagem='mobo.jpg', estoque=8),
            
            # Software
            Produto(nome='Windows 11 Pro', descricao='Sistema operacional profissional', preco=899.00, categoria='software', imagem='windows.jpg', estoque=50),
            Produto(nome='Microsoft Office 365', descricao='Assinatura anual completa', preco=349.00, categoria='software', imagem='office.jpg', estoque=100),
            Produto(nome='Adobe Creative Cloud', descricao='Todas as ferramentas Adobe por 1 ano', preco=2499.00, categoria='software', imagem='adobe.jpg', estoque=50),
            
            # Impressão 3D
            Produto(nome='Impressora 3D Creality Ender-3 V3', descricao='Impressora 3D FDM de alta precisão', preco=1899.99, categoria='impressao3d', imagem='3dprinter.jpg', estoque=6),
            Produto(nome='Filamento PLA 1kg', descricao='Filamento biodegradável em várias cores', preco=89.99, categoria='impressao3d', imagem='filament.jpg', estoque=50),
            Produto(nome='Resina UV 1L', descricao='Resina para impressoras SLA/DLP', preco=249.99, categoria='impressao3d', imagem='resin.jpg', estoque=30),
            
            # Drones
            Produto(nome='DJI Mini 4 Pro', descricao='Drone compacto com câmera 4K', preco=4999.99, categoria='drone', imagem='drone1.jpg', estoque=4),
            Produto(nome='DJI Mavic 3 Pro', descricao='Drone profissional com câmeras triplas', preco=12999.99, categoria='drone', imagem='drone2.jpg', estoque=2),
            Produto(nome='Bateria Extra para Drone', descricao='Bateria inteligente de longa duração', preco=599.99, categoria='drone', imagem='battery.jpg', estoque=15),
        ]
        
        for produto in produtos:
            db.session.add(produto)
        
        db.session.commit()
        print('Produtos inicializados com sucesso!')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        inicializar_produtos()
    app.run(debug=True)
