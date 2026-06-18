# Pipeline de Integração Contínua — pgats-atividade-extra-login

## Visão Geral

Este projeto implementa uma **pipeline de integração contínua** utilizando **GitHub Actions**, com execução automática de testes, geração de relatório de cobertura e armazenamento dos resultados como artefato da pipeline.

---

## Estrutura do Projeto

```
.
├── .github/
│   └── workflows/
│       └── ci.yml           ← definição da pipeline
├── src/
│   └── gerenciarLogin.js    ← módulo principal
├── tests/
│   └── testLogin.test.js    ← testes automatizados
├── coverage/                ← relatório de cobertura (gerado automaticamente)
├── test-results/            ← relatório XML dos testes (gerado automaticamente)
├── package.json
└── README.md
```

---

## Como a Pipeline Funciona

### Gatilhos (`on`)

| Gatilho | Quando dispara |
|---|---|
| `push` | A cada push em qualquer branch |
| `workflow_dispatch` | Execução manual pela aba **Actions** no GitHub |
| `schedule (cron)` | Todo sabado às 08h (horário de Brasília) |

### Etapas do Job (`steps`)

1. **Checkout** — clona o repositório no runner
2. **Setup Node.js 20** — configura o ambiente com cache do npm
3. **`npm ci`** — instala dependências de forma limpa e reproduzível
4. **`npm run test`** — executa os testes, gera relatório XML (JUnit) e relatório de cobertura HTML
5. **Upload de artefato** — publica `test-results/` e `coverage/` como artefato da pipeline, retido por 30 dias, mesmo que os testes falhem (`if: always()`)

---

## Testes Automatizados

Foi utilizado o repositorio da atividade extra da disciplina de Programação para Automação de Testes

Os testes cobrem a função `validaLogin` do módulo `gerenciarLogin.js`, verificando os seguintes cenários:

| # | Cenário | Resultado esperado |
|---|---|---|
| 1 | Email e senha corretos | Retorna sucesso |
| 2 | Credencial expirada | Informa credencial expirada |
| 3 | Usuário não existe | Retorna erro |
| 4 | Senha incorreta | Retorna erro |

### Executar testes localmente

```bash
npm run test
```

---

## Ferramentas Utilizadas

| Ferramenta | Função |
|---|---|
| **GitHub Actions** | Plataforma de automação da pipeline |
| **Mocha** | Framework de testes para Node.js |
| **Chai** | Biblioteca de asserções |
| **c8** | Geração de relatório de cobertura de código (compatível com ESModules) |
| **mocha-junit-reporter** | Geração de relatório XML no formato JUnit |

---

## Relatório de Testes

Após cada execução da pipeline, o relatório fica disponível em:

**Actions → selecione a execução → seção Artifacts → `relatorio-testes`**

O arquivo zip contém:
- `test-results/results.xml` — resultado por teste no formato JUnit
- `coverage/index.html` — relatório visual de cobertura de código

---

## Conceitos Utilizados

### Integração Contínua (CI)
Prática de integrar código frequentemente com verificação automatizada, detectando erros cedo no ciclo de desenvolvimento e reduzindo retrabalho.

### GitHub Actions
Plataforma de automação nativa do GitHub. Workflows são definidos em arquivos YAML dentro de `.github/workflows/` e executados diretamente na infraestrutura do GitHub.

### Workflow
Arquivo YAML que define toda a automação: gatilhos, jobs e steps. Neste projeto, o arquivo `ci.yml` define a pipeline completa.

### Runner
Servidor virtual (`ubuntu-latest`) fornecido pelo GitHub onde os jobs são executados. Cada execução parte de um ambiente limpo e reproduzível.

### Artefatos
Arquivos gerados durante a pipeline e armazenados no GitHub via `actions/upload-artifact`. Ficam disponíveis para download na aba **Actions** por até 30 dias, permitindo auditar resultados de execuções anteriores.

### `npm ci` vs `npm install`
`npm ci` instala exatamente as versões registradas no `package-lock.json`, garantindo builds reproduzíveis — prática essencial em ambientes de CI onde consistência é fundamental.

### `if: always()`
Garante que o upload do relatório ocorra mesmo quando os testes falham, permitindo analisar o motivo da falha através do artefato gerado.

### Cron Schedule
Expressão `0 11 * * 1` representa toda segunda-feira às 11h UTC (08h de Brasília). Execuções agendadas são úteis para detectar quebras causadas por atualizações de dependências mesmo sem novos commits no repositório.

### ESModules (`"type": "module"`)
O projeto utiliza a sintaxe moderna de módulos do JavaScript (`import`/`export`). Por isso, foi necessário usar o **c8** no lugar do nyc para cobertura de código, pois o c8 tem suporte nativo a ESModules via V8.
