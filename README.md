# 🌊 Maresia Log

> Aplicação web acadêmica de logística refrigerada — desenvolvida com **AngularJS** e **Vue.js**

![AngularJS](https://img.shields.io/badge/AngularJS-1.8.2-E23237?style=flat&logo=angularjs)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-42B883?style=flat&logo=vuedotjs)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite)

---

## 📋 Sobre o Projeto

A **Maresia Log** é uma empresa fictícia de logística refrigerada que conecta pequenos produtores de alimentos frescos a restaurantes, cafés e mercados em Salvador e Região Metropolitana.

Este repositório contém **duas aplicações independentes** com a mesma identidade visual, desenvolvidas como atividade da disciplina de Programação Avançada:

| Pasta | Framework | Como rodar |
|---|---|---|
| `angularjs-maresia/` | AngularJS 1.8.2 | Abrir o `index.html` direto no browser |
| `vue-maresia-desafio/` | Vue.js 3 + Vite | `npm install` → `npm run dev` |

Ambas implementam os **6 componentes obrigatórios** da especificação:

- 🪗 Acordeão (Accordion)
- 📄 Paginação (Pagination)
- 📊 Barra de Progresso (Progress Bar)
- 🗂️ Abas (Tabs)
- 📂 Menu Suspenso (Dropdown)
- 🔔 Notificação Toast

---

## 📁 Estrutura de Pastas

```
Projeto_ProgrmacaoAvancada_Angular/
├── angularjs-maresia/              ← Aplicação AngularJS
│   ├── index.html                  ← Ponto de entrada (abre direto no browser)
│   ├── assets/
│   │   └── css/
│   │       └── styles.css          ← Todo o CSS da aplicação
│   └── src/
│       ├── app.js                  ← Módulo raiz do AngularJS
│       ├── controllers/
│       │   └── mainController.js   ← Lógica principal da página
│       ├── directives/
│       │   ├── mAccordion.js       ← Componente Acordeão
│       │   ├── mDropdown.js        ← Componente Menu Suspenso
│       │   ├── mPagination.js      ← Componente Paginação
│       │   ├── mProgress.js        ← Componente Barra de Progresso
│       │   ├── mTabs.js            ← Componente Abas
│       │   └── mToast.js           ← Componente Toast
│       └── services/
│           ├── dataService.js      ← Dados fictícios da aplicação
│           └── toastService.js     ← Serviço global de notificações
│
└── vue-maresia-desafio/            ← Aplicação Vue.js (desafio extra)
    ├── index.html                  ← Shell HTML do Vite
    ├── package.json                ← Dependências do projeto
    ├── vite.config.js              ← Configuração do Vite
    └── src/
        ├── main.js                 ← Ponto de entrada Vue
        ├── App.vue                 ← Componente raiz
        ├── styles/
        │   └── global.css          ← CSS global
        └── components/
            ├── MAccordion.vue      ← Componente Acordeão
            ├── MDropdown.vue       ← Componente Menu Suspenso
            ├── MPagination.vue     ← Componente Paginação
            ├── MProgress.vue       ← Componente Barra de Progresso
            ├── MTabs.vue           ← Componente Abas
            └── MToast.vue          ← Componente Toast
```

---

## 🚀 Como Rodar

### AngularJS — sem instalação necessária

A aplicação AngularJS carrega o framework via CDN, então não precisa instalar nada.

**Opção 1 — abrir direto no browser (mais simples):**

1. Extraia o ZIP do projeto
2. Navegue até a pasta `angularjs-maresia/`
3. Clique duas vezes no arquivo `index.html`

> ⚠️ Se o browser bloquear os arquivos por restrição de CORS, use a Opção 2.

**Opção 2 — Live Server no VS Code (recomendado):**

1. Instale a extensão **Live Server** de Ritwick Dey no VS Code
2. Abra a pasta `angularjs-maresia/` no VS Code
3. Clique com o botão direito em `index.html` → **Open with Live Server**
4. O browser abre automaticamente em `http://127.0.0.1:5500`

**Opção 3 — servidor Python (se tiver Python instalado):**

```bash
# Navegue até a pasta
cd angularjs-maresia

# Python 3
python -m http.server 8080
```

Acesse `http://localhost:8080` no browser.

---

### Vue.js — requer Node.js

#### Pré-requisito: Node.js

Verifique se já tem instalado:

```bash
node --version
```

Se retornar um número (ex: `v18.0.0`), está ok. Caso contrário, baixe em [nodejs.org](https://nodejs.org) e instale a versão **LTS**.

#### Rodando o projeto

```bash
# 1. Entre na pasta da aplicação Vue
cd vue-maresia-desafio

# 2. Instale as dependências (só precisa fazer isso uma vez)
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O terminal vai exibir:

```
  VITE v5.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
```

Abra `http://localhost:5173` no browser. Para parar o servidor, pressione `Ctrl+C`.

> 💡 **Hot reload:** qualquer alteração salva nos arquivos `.vue` atualiza o browser automaticamente.

---

## 🧩 Componentes

### Acordeão
Lista de perguntas frequentes (FAQ). Apenas um item fica aberto por vez — ao abrir outro, o anterior fecha automaticamente.

- **AngularJS:** `src/directives/mAccordion.js`
- **Vue:** `src/components/MAccordion.vue`

### Paginação
Navega entre páginas da listagem de rotas. Botões Anterior/Próxima ficam desabilitados nos limites. Ao trocar de página, emite evento para o componente pai.

- **AngularJS:** `src/directives/mPagination.js`
- **Vue:** `src/components/MPagination.vue`

### Barra de Progresso
Exibe o percentual de implantação da rota piloto. A largura da barra é controlada dinamicamente pelo valor recebido via prop.

- **AngularJS:** `src/directives/mProgress.js`
- **Vue:** `src/components/MProgress.vue`

### Abas
Organiza o conteúdo em três painéis: Produtores, Restaurantes e Operação. Apenas um painel fica visível por vez.

- **AngularJS:** `src/directives/mTabs.js`
- **Vue:** `src/components/MTabs.vue`

### Menu Suspenso
Filtra a listagem de rotas por bairro. Fecha ao selecionar uma opção ou ao clicar fora do menu.

- **AngularJS:** `src/directives/mDropdown.js`
- **Vue:** `src/components/MDropdown.vue`

### Toast
Mensagens temporárias de feedback no canto inferior direito. Desaparecem após 3,2 segundos ou ao clicar no botão de fechar. Suporta três tipos: `success`, `error` e `info`.

- **AngularJS:** `src/directives/mToast.js` + `src/services/toastService.js`
- **Vue:** `src/components/MToast.vue`

---

## 🐛 Bugs Corrigidos

<details>
<summary>AngularJS — 6 correções</summary>

| Arquivo | Problema | Correção |
|---|---|---|
| `mProgress.js` | `ng-style` com aspas duplas dentro de string JS — erro de sintaxe que impedia a diretiva de compilar | Substituído por função `getBarStyle()` no scope que retorna um objeto JS válido |
| `mTabs.js` | `ng-click="active = $index"` não garante disparo do `$digest`; `tabs[active]` sem guarda para array vazio | Método `setActive()` dedicado; `ng-if` protege contra `undefined` |
| `mAccordion.js` | `opened` iniciava em `0`, abrindo o primeiro item automaticamente | Corrigido para `null` (todos fechados ao carregar) |
| `mDropdown.js` | `element[0].contains()` sem verificar se o elemento existia — crash ao desmontar | Adicionada verificação `element[0] &&` |
| `mToast.js` | `ng-class` com array misturando string e objeto não aplicava a classe de tipo corretamente | Substituído por função `getToastClasses()` que retorna objeto de classes |
| `mainController.js` | `$scope.toast = toastService.toast` copiava referência uma vez só — mudanças no serviço não refletiam na view | Corrigido com `Object.defineProperty` getter |

</details>

<details>
<summary>Vue.js — 8 correções</summary>

| Arquivo | Problema | Correção |
|---|---|---|
| `package.json` | `vite` e `@vitejs/plugin-vue` em `dependencies` em vez de `devDependencies` | Movidos para `devDependencies` |
| `MPagination.vue` | `v-for="page in totalPages"` iterando número diretamente — ambíguo no Vue 3 com Vite | Computed `pageNumbers` retorna array explícito |
| `MProgress.vue` | Sem validação do valor — número fora de 0–100 quebrava o layout | Computed `clampedProgress` com `Math.min/max` |
| `MTabs.vue` | `tabs[active].content` causaria `TypeError` com array vazio; atribuição direta no template | `v-if="tabs.length > 0"` + método `setActive()` |
| `MAccordion.vue` | `opened` iniciava em `0` | Corrigido para `null` |
| `MDropdown.vue` | `$refs.dropdown.contains()` sem guarda — `TypeError` ao desmontar | Adicionado `this.$refs.dropdown &&` |
| `MToast.vue` | Sem lifecycle hook (requisito da especificação); classes dinâmicas com binding incorreto | Adicionado `mounted()`; classes corrigidas com sintaxe de array |
| `App.vue` | `this.toast.visible = false` não garantia re-render em todos os casos | `this.toast = { ...this.toast, visible: false }` reassigna o objeto inteiro |

</details>

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| AngularJS | 1.8.2 | Framework da aplicação principal (via CDN) |
| Vue.js | 3.4+ | Framework do desafio extra |
| Vite | 5.0+ | Servidor de dev e bundler para o Vue |
| Node.js | 18+ LTS | Ambiente necessário para rodar o Vite |
| CSS puro | — | Estilização sem frameworks externos |
| Inter (Google Fonts) | — | Tipografia de ambas as aplicações |

---

## 📐 Responsividade

A aplicação é testada em três breakpoints:

| Dispositivo | Largura | Layout |
|---|---|---|
| Desktop | > 860px | Hero em duas colunas, grid de componentes lado a lado |
| Tablet | 520px – 860px | Colunas empilhadas, navegação reorganizada |
| Mobile | < 520px | Layout vertical, botões em largura total, fontes reduzidas |

---

*Projeto acadêmico fictício · Maresia Log · Programação Avançada 2026*
