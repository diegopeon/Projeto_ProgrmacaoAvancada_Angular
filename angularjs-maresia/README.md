# Maresia Log — Atividade AngularJS 2026

Landing page fictícia de uma empresa específica: **Maresia Log**, uma operação de logística refrigerada para pequenos produtores de alimentos frescos em Salvador e Região Metropolitana.

A ideia foi fugir do visual genérico de SaaS/IA e criar uma interface com contexto de negócio mais real: rotas, temperatura, produtores, restaurantes, filtros por bairro e status de entrega.

## Tecnologias

- HTML5
- CSS3 puro
- AngularJS 1.8.2
- Sem bibliotecas externas de componentes

## Componentes obrigatórios implementados como diretivas AngularJS

1. `mAccordion` — FAQ expansível com apenas um item aberto por vez.
2. `mPagination` — navegação entre páginas de rotas.
3. `mProgress` — barra de progresso da implantação da rota piloto.
4. `mTabs` — abas por público: produtores, restaurantes e operação.
5. `mDropdown` — filtro por bairro com fechamento ao clicar fora.
6. `mToast` — notificação temporária de sucesso, erro ou informação.

## Conceitos usados

- Módulo principal em `src/app.js`.
- Controller principal em `src/controllers/mainController.js`.
- Factory de dados em `src/services/dataService.js`.
- Serviço de toast em `src/services/toastService.js`.
- Diretivas isoladas com `scope`, bindings e eventos.
- `ng-click`, `ng-repeat`, `ng-class`, `ng-show`, `ng-style` e two-way binding.

## Como executar

Como é um projeto AngularJS simples, basta abrir o arquivo `index.html` no navegador.

Caso o navegador bloqueie algum recurso local, rode um servidor estático na pasta do projeto:

```bash
python -m http.server 8000
```

Depois acesse:

```bash
http://localhost:8000
```

## Organização

```text
angularjs-maresia/
├── assets/css/styles.css
├── index.html
├── src/
│   ├── app.js
│   ├── controllers/mainController.js
│   ├── directives/
│   └── services/
└── README.md
```

## Decisões de design

- Paleta mais orgânica: verde frio, areia e argila.
- Visual escuro, mas menos futurista e mais próximo de uma operação real.
- Cards com dados operacionais: temperatura, janelas de entrega e rotas.
- Microanimações sutis para dar vida sem parecer template automático.
- Interface responsiva para desktop, tablet e celular.
