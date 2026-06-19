# Sistema de Gerenciamento de República (SGR) - Front-end

## Sobre o Projeto

O Sistema de Gerenciamento de República (SGR) é uma aplicação web desenvolvida para auxiliar na administração financeira de repúblicas estudantis. O sistema permite o cadastro de moradores, registro de despesas, realização de rateios, emissão de saldos, emissão de extratos e acompanhamento dos gastos da república.

Este repositório contém o front-end da aplicação, desenvolvido com Angular. A interface consome os dados disponibilizados pela API do SGR, implementada em Spring Boot.

## Tecnologias Utilizadas

* Angular
* TypeScript
* Bootstrap
* RxJS
* Angular Router
* Reactive Forms
* Chart.js

## Funcionalidades

* Cadastro, consulta, alteração e exclusão de moradores
* Autenticação de usuários
* Cadastro, consulta, alteração e exclusão de tipos de conta
* Cadastro, consulta, alteração, quitação e cancelamento de contas
* Rateio de contas entre moradores
* Replicação de contas
* Emissão de saldo por morador
* Emissão de extrato de contas
* Painel de informações com contas pendentes, gráficos e totalizadores

## Estrutura do Projeto

```text
src
├── app
│   ├── components
│   ├── guards
│   ├── models
│   ├── pipes
│   ├── services
│   ├── app.config.ts
│   └── app.routes.ts
└── assets
```

## Como Executar

### Clonar o Repositório

```bash
git clone https://github.com/odiloncorrea/sgr.git
```

### Acessar a Pasta do Projeto

```bash
cd sgr
```

### Instalar as Dependências

```bash
npm install
```

### Executar a Aplicação

```bash
ng serve
```

A aplicação estará disponível em:

```text
http://localhost:4200
```

## Integração com a API

Antes de executar o front-end, certifique-se de que a API do SGR esteja em execução.

Por padrão, o front-end consome a API em:

```text
http://localhost:8080
```

Caso necessário, altere a URL da API nos arquivos de serviço localizados em:

```text
src/app/services
```

## Requisitos

* Node.js
* Angular CLI
* API do SGR em execução

## Repositório do Back-end

```text
https://github.com/odiloncorrea/api-sgr
```

## Status do Projeto

✅ Projeto concluído

Todos os requisitos funcionais e não funcionais definidos no documento de requisitos foram implementados.

## Autor

Odilon Corrêa

Projeto desenvolvido como estudo de caso da disciplina de Desenvolvimento de Sistemas utilizando Angular e Spring Boot.
