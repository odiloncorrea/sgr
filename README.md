# Sistema de Gerenciamento de República (SGR)

## Sobre o Projeto

O Sistema de Gerenciamento de República (SGR) é uma aplicação web desenvolvida para auxiliar na administração financeira de repúblicas estudantis. O sistema permite o cadastro de moradores, registro de despesas, realização de rateios, emissão de extratos e acompanhamento dos gastos da república.

O projeto foi desenvolvido utilizando Spring Boot no back-end e Angular no front-end, seguindo uma arquitetura em camadas para facilitar a manutenção e evolução do sistema.

## Tecnologias Utilizadas

### Back-end

* Java 21
* Spring Boot
* Spring Data JPA
* Spring Validation
* MySQL
* Lombok
* Swagger / OpenAPI

### Front-end

* Angular
* TypeScript
* Bootstrap

## Funcionalidades

### Moradores

* Cadastro de moradores
* Consulta de moradores
* Alteração de moradores
* Exclusão de moradores

### Autenticação

* Login de usuários
* Controle de acesso ao sistema

### Tipos de Conta

* Cadastro de tipos de conta
* Consulta de tipos de conta
* Alteração de tipos de conta
* Exclusão de tipos de conta

### Contas

* Cadastro de contas
* Alteração de contas
* Cancelamento de contas
* Quitação de contas
* Histórico de alterações

### Rateio

* Divisão de contas entre moradores
* Controle da situação de pagamento de cada participante

### Relatórios

* Emissão de saldo por morador
* Emissão de extrato de contas

### Dashboard

* Contas pendentes
* Gastos por tipo de conta
* Gastos por morador
* Total de contas pendentes

## Modelo de Dados

O sistema é composto pelas seguintes entidades:

* Morador
* TipoConta
* Conta
* Rateio
* Historico

## Estrutura do Projeto

```text
src
├── controllers
├── services
├── repositories
├── entities
├── dtos
├── enums
└── config
```

## Como Executar

### Clonar o Repositório

```bash
git clone https://github.com/odiloncorrea/api-sgr.git
```

### Configurar o Banco de Dados

Criar um banco de dados MySQL e ajustar as configurações no arquivo:

```properties
application.properties
```

### Executar a Aplicação

```bash
./mvnw spring-boot:run
```

ou

```bash
mvn spring-boot:run
```

### Acessar a Documentação da API

```text
http://localhost:8080/swagger-ui.html
```

## Requisitos

* Java 21 ou superior
* Maven 3.9+
* MySQL 8+

## Autor

Odilon Corrêa

Projeto desenvolvido como estudo de caso da disciplina de Desenvolvimento de Sistemas utilizando Angular e Spring Boot.
