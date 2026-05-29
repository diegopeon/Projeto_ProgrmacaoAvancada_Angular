# Maresia Log — Interfaces Responsivas com AngularJS e Vue.js

Projeto desenvolvido para a atividade prática de frameworks front-end, contemplando uma aplicação principal em **AngularJS** e um desafio extra em **Vue.js**.

O tema escolhido foi a **Maresia Log**, uma empresa fictícia de logística refrigerada voltada para pequenos produtores, restaurantes, empórios e negócios alimentícios de Salvador e Região Metropolitana.

A proposta visual foge do modelo genérico de dashboard corporativo e busca uma identidade mais realista, regional e funcional, misturando tecnologia, operação logística, alimentos frescos, controle de temperatura e rotas urbanas.

---

## Objetivo do Projeto

O objetivo deste projeto é demonstrar, de forma prática, o uso de componentes visuais reutilizáveis em aplicações web responsivas.

Foram desenvolvidas duas versões:

- **AngularJS**: atividade principal, utilizando módulos, controladores, serviços, diretivas, bindings e filtros.
- **Vue.js**: desafio extra, utilizando componentes, props, data, computed properties, métodos, eventos e lifecycle hooks.

Ambas as aplicações utilizam o mesmo conceito visual e a mesma temática de negócio, mas cada uma foi construída respeitando a lógica própria do framework solicitado.

---

## Tema da Aplicação

A **Maresia Log** é uma empresa fictícia especializada em entregas refrigeradas de curta distância.

Ela atende negócios como:

- pequenos produtores de alimentos frescos;
- empórios;
- restaurantes;
- cafeterias;
- cozinhas artesanais;
- fornecedores locais.

A aplicação simula uma página institucional e operacional da empresa, apresentando serviços, indicadores, rotas, dúvidas frequentes, status de entregas e recursos de acompanhamento.

A escolha desse tema permite que os componentes não sejam apenas decorativos, mas tenham uso contextualizado dentro de um cenário de negócio mais próximo da realidade.

---

## Componentes Desenvolvidos

As duas versões do projeto implementam os seis componentes obrigatórios da atividade.

### 1. Accordion

Utilizado para exibir perguntas frequentes sobre coleta, temperatura, regiões atendidas e funcionamento das entregas.

Funcionalidades:

- múltiplos itens expansíveis;
- abertura de uma resposta por vez;
- transição suave;
- conteúdo semanticamente relacionado ao negócio.

---

### 2. Pagination

Utilizada para navegar entre registros simulados de entregas, rotas ou solicitações.

Funcionalidades:

- botão de página anterior;
- botão de próxima página;
- botões numéricos;
- indicação da página atual;
- bloqueio de navegação quando não há página anterior ou próxima.

---

### 3. Progress Bar

Utilizada para representar o andamento de uma rota refrigerada ou o nível de conclusão de uma operação logística.

Funcionalidades:

- preenchimento visual progressivo;
- exibição percentual;
- adaptação visual ao valor informado;
- uso contextualizado com operação de entrega.

---

### 4. Tabs

Utilizadas para organizar informações da empresa em seções diferentes.

Exemplos de abas:

- operação;
- temperatura;
- cobertura;
- atendimento.

Funcionalidades:

- alternância entre conteúdos;
- destaque da aba ativa;
- organização limpa das informações;
- melhoria da experiência de leitura.

---

### 5. Dropdown Menu

Utilizado para simular filtros ou seleção de opções operacionais, como região, tipo de carga ou status da entrega.

Funcionalidades:

- abertura e fechamento do menu;
- seleção de opções;
- atualização visual da opção escolhida;
- fechamento após seleção.

---

### 6. Toast Notification

Utilizado para exibir mensagens rápidas de feedback ao usuário.

Exemplos:

- rota atualizada;
- coleta confirmada;
- filtro aplicado;
- operação concluída.

Funcionalidades:

- exibição temporária;
- tipos diferentes de mensagem;
- botão ou ação de fechamento;
- feedback visual discreto e funcional.

---

## Estrutura Geral do Projeto

O projeto está dividido em duas pastas principais:

```text
maresia-atividade-frameworks/
│
├── angularjs-maresia/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── directives/
│   │   ├── services/
│   │   └── filters/
│   └── README.md
│
└── vue-maresia-desafio/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── src/
    │   ├── main.js
    │   ├── App.vue
    │   ├── components/
    │   └── assets/
    └── README.md
