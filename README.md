# Maresia Log — Interfaces Responsivas com AngularJS e Vue.js

Projeto desenvolvido para a atividade prática de frameworks front-end, contemplando uma aplicação principal em **AngularJS** e um desafio extra em **Vue.js**.

O tema escolhido foi a **Maresia Log**, uma empresa fictícia de logística refrigerada voltada para pequenos produtores, restaurantes, empórios e negócios alimentícios de Salvador e Região Metropolitana.

A proposta visual busca fugir de uma interface genérica, trazendo uma estética mais próxima de uma empresa real: operação logística, rotas urbanas, controle de temperatura, entregas programadas e atendimento a negócios locais.

---

## Objetivo do Projeto

O objetivo deste projeto é demonstrar, de forma prática, o uso de componentes visuais reutilizáveis em aplicações web responsivas.

Foram desenvolvidas duas versões:

- **AngularJS**: atividade principal, utilizando módulos, controladores, serviços, diretivas, bindings e filtros.
- **Vue.js**: desafio extra, utilizando componentes, props, data, métodos, eventos, emissão de eventos e lifecycle hooks.

As duas versões seguem a mesma identidade visual e o mesmo contexto de negócio, mas cada uma respeita a organização e a lógica do framework utilizado.

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

A aplicação simula uma interface institucional e operacional da empresa, apresentando informações sobre serviços, indicadores, rotas, dúvidas frequentes, status de entregas e recursos de acompanhamento.

---

## Componentes Desenvolvidos

As duas versões do projeto implementam os seis componentes obrigatórios da atividade:

1. Accordion
2. Pagination
3. Progress Bar
4. Tabs
5. Dropdown Menu
6. Toast Notification

Cada componente foi adaptado ao contexto da Maresia Log, simulando recursos reais de uma empresa de logística refrigerada.

---

## Detalhamento dos Componentes

### 1. Accordion

Utilizado para exibir perguntas frequentes sobre coleta, temperatura, regiões atendidas e funcionamento das entregas.

Funcionalidades:

- múltiplos itens expansíveis;
- abertura de uma resposta por vez;
- transição suave;
- conteúdo relacionado ao negócio.

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
- opção de fechamento;
- feedback visual discreto e funcional.

---

## Estrutura Geral do Projeto

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
```

---

# Como Rodar o Projeto AngularJS

A versão AngularJS é uma aplicação estática simples.

Ela pode ser aberta diretamente no navegador ou executada por meio de um servidor local.

---

## Opção 1 — Abrir diretamente no navegador

Entre na pasta do projeto AngularJS:

```bash
cd angularjs-maresia
```

Depois abra o arquivo:

```text
index.html
```

Você pode abrir o arquivo com duplo clique ou arrastá-lo para o navegador.

---

## Opção 2 — Rodar com servidor local

Essa opção é recomendada para evitar problemas de carregamento de arquivos locais.

Dentro da pasta `angularjs-maresia`, rode:

```bash
python -m http.server 8000
```

Depois acesse no navegador:

```text
http://localhost:8000
```

Caso o comando acima não funcione, tente:

```bash
python3 -m http.server 8000
```

---

# Como Rodar o Projeto Vue.js

A versão Vue.js precisa ser executada pelo terminal, pois utiliza o Vite como ambiente de desenvolvimento.

Antes de começar, é necessário ter o **Node.js** instalado no computador.

---

## Tutorial Básico para Rodar o Vue.js

Abra o terminal na pasta principal do projeto.

Depois siga os comandos abaixo.

---

### Passo 1 — Entrar na pasta do projeto Vue.js

```bash
cd vue-maresia-desafio
```

Esse comando faz o terminal entrar na pasta onde está o projeto Vue.js.

---

### Passo 2 — Instalar as dependências

```bash
npm i
```

Esse comando instala todos os pacotes necessários para o projeto funcionar.

Também é possível usar:

```bash
npm install
```

Os dois comandos fazem a mesma coisa.

---

### Passo 3 — Rodar o projeto

```bash
npm run dev
```

Depois disso, o terminal irá mostrar um endereço parecido com este:

```text
http://localhost:5173
```

Copie esse endereço e abra no navegador.

Pronto. A aplicação Vue.js estará funcionando localmente.

---

## Resumo Rápido para Rodar o Vue.js

```bash
cd vue-maresia-desafio
npm i
npm run dev
```

Depois abra no navegador o endereço exibido no terminal.

---

## Como Gerar a Versão Final do Vue.js

Caso queira gerar uma versão otimizada para hospedagem, rode:

```bash
npm run build
```

Esse comando cria uma pasta chamada:

```text
dist/
```

A pasta `dist` contém os arquivos finais do projeto, prontos para publicação.

---

## Como Visualizar a Versão Final Localmente

Depois de gerar o build, você pode testar a versão final com:

```bash
npm run preview
```

O terminal irá mostrar um endereço local para visualizar a aplicação já compilada.

---

## Tecnologias Utilizadas

### AngularJS

- HTML5
- CSS3
- JavaScript
- AngularJS
- Diretivas customizadas
- Services
- Controllers
- Filters

### Vue.js

- HTML5
- CSS3
- JavaScript
- Vue.js
- Vite
- Componentes Vue
- Props
- Events
- Lifecycle hooks

---

## Conceitos Aplicados no AngularJS

A versão AngularJS demonstra:

- criação de módulo principal;
- uso de controller;
- uso de `$scope`;
- uso de `ng-model`;
- uso de `ng-click`;
- criação de serviços;
- criação de filtros;
- criação de diretivas reutilizáveis;
- separação entre estrutura, estilo e comportamento.

---

## Conceitos Aplicados no Vue.js

A versão Vue.js demonstra:

- criação de componentes;
- passagem de dados por `props`;
- gerenciamento de estado local com `data`;
- uso de `computed properties`;
- criação de métodos;
- manipulação de eventos com `@click`;
- emissão de eventos com `$emit`;
- uso de lifecycle hook `mounted`;
- organização modular da aplicação.

---

## Decisões de Design

A identidade visual da Maresia Log foi construída com foco em uma estética moderna, mas menos genérica.

Foram utilizados:

- fundo escuro para transmitir tecnologia e controle operacional;
- tons frios e verdes para remeter a refrigeração, frescor e logística alimentar;
- cards com bordas suaves;
- microinterações discretas;
- botões com estados visuais claros;
- layout responsivo;
- hierarquia visual bem definida;
- textos próximos de uma empresa real.

A intenção foi criar uma interface com aparência profissional, mas com personalidade própria.

---

## Responsividade

As duas aplicações foram pensadas para funcionar em:

- celulares;
- tablets;
- notebooks;
- desktops.

O layout utiliza grids flexíveis, quebras de linha, espaçamentos proporcionais e adaptação dos cards em telas menores.

---

## Organização do Código

O código foi escrito com foco em:

- clareza;
- separação de responsabilidades;
- nomes descritivos;
- comentários explicativos;
- reaproveitamento de componentes;
- organização por pastas;
- facilidade de manutenção.

A proposta não foi apenas montar uma tela bonita, mas demonstrar domínio da estrutura exigida na atividade.

---

## Observações Finais

Este projeto atende aos principais requisitos solicitados:

- aplicação responsiva;
- seis componentes visuais obrigatórios;
- implementação em AngularJS;
- desafio extra em Vue.js;
- código organizado;
- uso de componentes e diretivas;
- comentários no código;
- tema visual personalizado;
- README explicativo;
- conteúdo contextualizado e semanticamente coerente.

A Maresia Log é uma empresa fictícia, criada apenas para fins acadêmicos, mas a interface foi pensada como se pudesse ser utilizada por uma operação real de logística refrigerada urbana.
