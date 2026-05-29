# Maresia Log — Desafio Extra Vue.js 2026

Aplicação Vue.js desenvolvida para o desafio extra da atividade. O tema foi refeito para parecer uma empresa real: **Maresia Log**, uma operação fictícia de logística refrigerada para pequenos produtores de alimentos frescos em Salvador e Região Metropolitana.

O objetivo visual foi sair do padrão genérico de SaaS roxo/IA e criar uma marca com mais corpo: operação local, rotas, temperatura, coleta, produtores, restaurantes e entregas refrigeradas.

## Tecnologias

- Vue.js
- Vite
- HTML5
- CSS3 puro
- Sem biblioteca externa de UI

## Componentes Vue implementados

1. `MAccordion.vue` — perguntas frequentes expansíveis.
2. `MPagination.vue` — paginação da listagem de rotas.
3. `MProgress.vue` — progresso da implantação da rota piloto.
4. `MTabs.vue` — abas para públicos e usos diferentes.
5. `MDropdown.vue` — filtro por bairro com fechamento externo.
6. `MToast.vue` — notificação temporária com tipos diferentes.

## Conceitos Vue usados

- Componentes reutilizáveis.
- `props` para envio de dados.
- `data` para estado local.
- `computed` para paginação.
- `methods` para ações da interface.
- `$emit` para comunicação entre componentes.
- `mounted` e `beforeUnmount` para ciclo de vida do dropdown.
- `mounted` no `App.vue` para demonstrar lifecycle hook.

## Como executar

Entre na pasta do projeto:

```bash
cd vue-maresia-desafio
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Gere a versão de produção:

```bash
npm run build
```

## Organização

```text
vue-maresia-desafio/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── components/
│   └── styles/global.css
└── README.md
```

## Decisões de interface

- Nicho específico: logística refrigerada para alimentos frescos.
- Paleta orgânica: verde frio, areia e argila.
- Layout responsivo com cards, filtros e lista operacional.
- Animações suaves, sem excesso de brilho artificial.
- Conteúdo semanticamente conectado ao negócio.
