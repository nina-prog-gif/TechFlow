# ♿ Guia de Acessibilidade - TechFlow

## 📋 Visão Geral

O TechFlow foi otimizado para ser **totalmente acessível** a usuários com deficiência visual que utilizam **leitores de tela** (como NVDA, JAWS, VoiceOver, TalkBack, etc.).

---

## ✅ Recursos de Acessibilidade Implementados

### 1. 🎯 Navegação por Teclado

**Recurso:** Todas as funcionalidades podem ser acessadas usando apenas o teclado.

**Como usar:**
- `Tab` - Navegar para o próximo elemento interativo
- `Shift + Tab` - Navegar para o elemento anterior
- `Enter` ou `Espaço` - Ativar botões e links
- `Setas` - Navegar em menus e listas

**Indicadores visuais:**
- Contorno laranja de 3px aparece ao redor de elementos focados
- Facilita saber onde você está navegando

---

### 2. 🔊 Suporte para Leitores de Tela

#### **Skip Links (Links de Pulo)**
- Link invisível no topo de cada página
- Permite pular direto para o conteúdo principal
- Atalho para usuários de leitores de tela economizarem tempo

#### **Landmarks ARIA** 
Todas as páginas têm regiões semânticas:
- `<nav role="navigation">` - Menu de navegação
- `<main>` - Conteúdo principal
- `<footer role="contentinfo">` - Rodapé

#### **Labels Descritivos**
Todos os elementos têm descrições claras:
```html
✅ "Alternar entre tema claro e escuro"
✅ "Adicionar Processador Intel ao carrinho"
✅ "Filtrar apenas hardware"
```

#### **Ícones Decorativos Ocultos**
Ícones puramente visuais são ocultados para leitores de tela:
```html
<i class="fas fa-microchip" aria-hidden="true"></i>
```

#### **Anúncios em Tempo Real**
Sistema anuncia ações importantes:
- ✅ "Produto adicionado ao carrinho. Total de itens: 3"
- ✅ "Tema escuro ativado"
- ✅ "12 produtos encontrados"
- ✅ "Filtro aplicado: Hardware"

---

### 3. 📝 Formulários Acessíveis

**Todos os campos de formulário têm:**
- `<label>` associado corretamente ao `<input>`
- Atributo `aria-required="true"` para campos obrigatórios
- Atributo `aria-describedby` com dicas de preenchimento
- Mensagens de erro anunciadas automaticamente

**Exemplo - Campo de senha:**
```html
<label for="senha">Senha</label>
<input id="senha" 
       aria-required="true" 
       aria-describedby="senha-help">
<span id="senha-help" class="sr-only">
  A senha deve ter no mínimo 6 caracteres
</span>
```

**Botão de mostrar/ocultar senha:**
- Tem `aria-label` descritivo
- Estado `aria-pressed` informa se está ativo

---

### 4. 🎨 Tema Claro e Escuro

**Contraste adequado:**
- Tema claro: Texto escuro (#1a1a1a) em fundo branco
- Tema escuro: Texto claro (#ffffff) em fundo preto
- Proporção de contraste >= 4.5:1 (WCAG AA)

**Botão acessível:**
- `aria-label` atualiza automaticamente
- Anuncia: "Tema escuro ativado" ou "Tema claro ativado"
- Funciona por teclado (Enter/Espaço)

---

### 5. 🛒 Carrinho de Compras Acessível

**Badge do carrinho:**
- Atualiza `aria-label` dinamicamente
- Anuncia: "3 itens no carrinho"

**Controles de quantidade:**
- Botões `+` e `-` com `aria-label` claro
- Anunciam a nova quantidade ao mudar

**Finalizar compra:**
- Feedback imediato ao usuário
- Anuncia: "Pedido realizado com sucesso!"

---

### 6. 📦 Rastreamento em Tempo Real

**Status do pedido:**
- Badge de status visível e anunciado
- Barra de progresso com porcentagem
- Etapas da entrega claramente marcadas

**Atualização automática:**
- Página atualiza a cada 5 segundos
- Mudanças de status são anunciadas
- Usuário é informado quando pedido é entregue

---

### 7. 🏷️ Atributos ARIA Utilizados

| Atributo | Uso | Exemplo |
|----------|-----|---------|
| `aria-label` | Rótulo descritivo | "Voltar para página inicial" |
| `aria-labelledby` | Referência a título | Vincula seção ao h1 |
| `aria-describedby` | Descrição adicional | Dicas em campos de formulário |
| `aria-hidden` | Oculta decoração | Ícones puramente visuais |
| `aria-live` | Região dinâmica | Anúncios de ações |
| `aria-atomic` | Anuncia conteúdo completo | Mensagens de feedback |
| `aria-current` | Página atual | "Você está na Loja" |
| `aria-pressed` | Estado de botão toggle | Filtros ativos |
| `aria-expanded` | Menu expandido/fechado | Menu mobile |
| `role` | Papel do elemento | navigation, main, list |

---

### 8. 📱 Responsividade Acessível

**Mobile:**
- Botões grandes (mínimo 44x44px)
- Espaçamento adequado entre elementos
- Zoom funciona corretamente
- Orientação portrait e landscape

---

## 🎓 Como Testar a Acessibilidade

### Testando com Leitores de Tela:

#### **Windows - NVDA (Grátis)**
1. Baixe: https://www.nvaccess.org/
2. Instale e inicie o NVDA
3. Abra o TechFlow no navegador
4. Use `Tab` para navegar
5. NVDA lerá cada elemento automaticamente

#### **Windows - JAWS (Pago)**
1. Baixe versão trial: https://www.freedomscientific.com/
2. Inicie JAWS
3. Navegue pelo site

#### **Mac - VoiceOver (Nativo)**
1. Pressione `Cmd + F5` para ativar
2. Use `VO + Setas` para navegar
3. `VO + Espaço` para ativar elementos

#### **Android - TalkBack (Nativo)**
1. Configurações → Acessibilidade → TalkBack
2. Ative o TalkBack
3. Navegue com gestos de deslize

#### **iOS - VoiceOver (Nativo)**
1. Ajustes → Acessibilidade → VoiceOver
2. Ative
3. Deslize para navegar

### Testando Apenas com Teclado:

1. **Não use o mouse!**
2. Pressione `Tab` repetidamente
3. Verifique se consegue acessar tudo
4. Use `Enter` para clicar em botões
5. Preencha formulários
6. Finalize uma compra

### Ferramentas de Teste:

**WAVE (Web Accessibility Evaluation Tool)**
- Extensão: https://wave.webaim.org/
- Analisa a página e mostra problemas

**Lighthouse (Chrome DevTools)**
- F12 → Lighthouse → Accessibility
- Dá nota de 0-100

**axe DevTools**
- Extensão: https://www.deque.com/axe/
- Testes automatizados completos

---

## 📊 Conformidade com Padrões

O TechFlow segue as diretrizes:

✅ **WCAG 2.1 Nível AA**
- Web Content Accessibility Guidelines
- Padrão internacional de acessibilidade web

✅ **WAI-ARIA 1.2**
- Accessible Rich Internet Applications
- Especificações para aplicações dinâmicas

✅ **Seção 508** (EUA)
- Lei de acessibilidade em tecnologia

---

## 🎯 Checklist de Acessibilidade

### Estrutura Semântica
- ✅ HTML5 semântico (`<nav>`, `<main>`, `<section>`)
- ✅ Hierarquia de headings correta (h1 → h2 → h3)
- ✅ Landmarks ARIA para navegação
- ✅ `lang="pt-BR"` no HTML

### Navegação
- ✅ Skip links implementados
- ✅ Foco visível (contorno laranja)
- ✅ Ordem de tabulação lógica
- ✅ Sem armadilhas de teclado

### Conteúdo
- ✅ Texto alternativo em imagens
- ✅ Links descritivos (sem "clique aqui")
- ✅ Labels em todos os campos de formulário
- ✅ Instruções claras

### Cores e Contraste
- ✅ Contraste adequado (>4.5:1)
- ✅ Informação não apenas por cor
- ✅ Tema claro e escuro

### Multimídia
- ✅ Ícones decorativos ocultos (`aria-hidden`)
- ✅ Animações podem ser pausadas
- ✅ Sem conteúdo piscante perigoso

### Interatividade
- ✅ Feedback para todas as ações
- ✅ Mensagens de erro claras
- ✅ Status de carregamento informado
- ✅ Confirmações de sucesso

### ARIA
- ✅ Roles apropriados
- ✅ States e properties atualizados
- ✅ Live regions para conteúdo dinâmico
- ✅ aria-label em elementos sem texto

---

## 💡 Dicas para Seu Aluno com Deficiência Visual

### Navegação Eficiente:

1. **Use o Skip Link**
   - Primeira tecla Tab em cada página
   - Pula direto para o conteúdo

2. **Teclas de Atalho do Leitor de Tela**
   - `H` - Próximo heading (título)
   - `B` - Próximo botão
   - `F` - Próximo campo de formulário
   - `L` - Próximo link

3. **Áreas Principais**
   - Navegue por landmarks (regiões)
   - Pule de seção em seção rapidamente

4. **Formulários**
   - Ouça as dicas de cada campo
   - Erros são anunciados automaticamente

5. **Compras**
   - Filtros têm labels claros
   - Cada produto é anunciado completamente
   - Carrinho informa quantidade de itens

---

## 🔍 Problemas Conhecidos e Limitações

### Melhorias Futuras:
- [ ] Adicionar atalhos de teclado personalizados
- [ ] Implementar modo de alto contraste
- [ ] Adicionar legendas em vídeos tutoriais
- [ ] Criar tour guiado por áudio

---

## 📞 Suporte e Feedback

Se seu aluno encontrar qualquer problema de acessibilidade:

1. Anote qual leitor de tela está usando
2. Descreva o problema encontrado
3. Informe em qual página ocorreu
4. Relate como esperava que funcionasse

**Nosso compromisso:** Acessibilidade é prioridade! 🦯

---

## 📚 Recursos Adicionais

### Aprender Mais sobre Acessibilidade:

**Documentação:**
- [MDN Web Accessibility](https://developer.mozilla.org/pt-BR/docs/Learn/Accessibility)
- [W3C ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

**Cursos:**
- [Google Web Accessibility](https://web.dev/accessibility/)
- [Udacity Web Accessibility](https://www.udacity.com/course/web-accessibility--ud891)

**Comunidades:**
- [A11Y Project](https://www.a11yproject.com/)
- [WebAIM](https://webaim.org/)

---

**TechFlow - Tecnologia acessível para todos! ♿🚀**

*Desenvolvido com inclusão e acessibilidade em mente*

---

## 🎓 Para Professores e Instrutores

### Como Ensinar com o TechFlow:

1. **Demonstração Prática**
   - Mostre o site com leitor de tela
   - Navegue apenas com teclado
   - Explique cada recurso

2. **Exercícios Práticos**
   - Peça para alunos testarem com NVDA
   - Façam uma compra sem mouse
   - Comparem tema claro vs escuro

3. **Análise de Código**
   - Mostre os atributos ARIA no HTML
   - Explique role, aria-label, etc.
   - Demonstre live regions

4. **Discussão**
   - Por que acessibilidade é importante?
   - Quantas pessoas usam leitores de tela?
   - Legislação sobre acessibilidade

### Material de Apoio:

Este documento pode ser usado como:
- ✅ Material de aula sobre acessibilidade web
- ✅ Guia para desenvolver projetos acessíveis
- ✅ Referência para boas práticas
- ✅ Exemplo de implementação real

---

**Última atualização:** Maio de 2026
**Versão:** 1.0
