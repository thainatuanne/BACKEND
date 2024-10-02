# BACKEND

# Aplicação Lista de Recados (Backend)

Este repositório contém a pasta **aplicacaoListaDeRecados**, uma API construída utilizando **Node.js** e **Express.js**. A aplicação permite o cadastro e autenticação de usuários, bem como a criação, leitura, atualização e exclusão de recados para cada usuário.

## Sumário
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
  - [Rotas de Usuários](#rotas-de-usuários)
    - [Cadastro de Usuário (Sign Up)](#cadastro-de-usuário-sign-up)
    - [Login de Usuário](#login-de-usuário)
  - [Rotas de Mensagens](#rotas-de-mensagens)
    - [Criação de Mensagem](#criação-de-mensagem)
    - [Leitura de Mensagens](#leitura-de-mensagens)
    - [Atualização de Mensagem](#atualização-de-mensagem)
    - [Deletar Mensagem](#deletar-mensagem)
- [Como Executar](#como-executar)

---

## Tecnologias Utilizadas

- **Node.js**: Plataforma usada para a construção do servidor backend.
- **Express.js**: Framework para a criação das rotas da API.
- **UUID**: Utilizado para gerar identificadores únicos para usuários e mensagens.
- **Bcrypt**: Biblioteca usada para criptografar senhas.
- **CORS**: Middleware para permitir requisições de diferentes origens.

---

## Funcionalidades

## Como Usar as Rotas

A seguir estão as rotas disponíveis na API de lista de recados, com explicações sobre como utilizá-las:

#### Cadastro de Usuário (Sign Up)

- **Método:** `POST`
- **Rota:** `/users/signup`
- **Descrição:** Permite o cadastro de um novo usuário. É necessário fornecer nome, e-mail e senha. Caso um desses itens esteja ausente ou o e-mail já esteja cadastrado, será retornada uma mensagem de erro.

#### Login de Usuário

- **Método:** `POST`
- **Rota:** `/users/login`
- **Descrição:** Realiza o login do usuário já cadastrado. É necessário fornecer o e-mail e a senha. Se o e-mail não estiver registrado ou a senha for incorreta, o login falhará e uma mensagem de erro será exibida.

### Rotas de Mensagens

## Como Usar as Rotas

### Rotas de Usuários

#### Cadastro de Usuário (Sign Up)

- **Método:** `POST`
- **Rota:** `/users/signup`
- **Descrição:** Permite o cadastro de um novo usuário.
- **Como Usar:**
  - Faça uma requisição `POST` para a rota `/users/signup` com um corpo JSON contendo `name`, `email` e `password`.
  - Se qualquer campo estiver ausente ou o e-mail já estiver registrado, uma mensagem de erro será retornada.
  - Caso o cadastro seja bem-sucedido, uma mensagem de boas-vindas será enviada.

#### Login de Usuário

- **Método:** `POST`
- **Rota:** `/users/login`
- **Descrição:** Realiza o login de um usuário existente.
- **Como Usar:**
  - Faça uma requisição `POST` para a rota `/users/login` com um corpo JSON contendo `email` e `password`.
  - Se o e-mail ou a senha estiverem incorretos, uma mensagem de erro será retornada.
  - Caso o login seja bem-sucedido, uma mensagem de boas-vindas será retornada.

---

### Rotas de Mensagens

#### Criação de Mensagem

- **Método:** `POST`
- **Rota:** `/messages`
- **Descrição:** Cria uma nova mensagem para o usuário logado.
- **Como Usar:**
  - Faça uma requisição `POST` para a rota `/messages` com um corpo JSON contendo `email`, `title` e `description`.
  - Se o e-mail não estiver cadastrado ou se algum campo estiver ausente, uma mensagem de erro será retornada.
  - Caso a mensagem seja criada com sucesso, os dados da nova mensagem serão retornados.

#### Leitura de Mensagens

- **Método:** `GET`
- **Rota:** `/messages/:email`
- **Descrição:** Recupera todas as mensagens associadas ao e-mail do usuário.
- **Como Usar:**
  - Faça uma requisição `GET` para a rota `/messages/:email`, substituindo `:email` pelo e-mail do usuário.
  - Se o e-mail não estiver registrado, uma mensagem de erro será retornada.
  - Caso o e-mail esteja correto, todas as mensagens do usuário serão exibidas.

#### Atualização de Mensagem

- **Método:** `PUT`
- **Rota:** `/messages/:id`
- **Descrição:** Atualiza uma mensagem existente com base no ID.
- **Como Usar:**
  - Faça uma requisição `PUT` para a rota `/messages/:id`, substituindo `:id` pelo ID da mensagem.
  - No corpo da requisição, forneça os novos valores de `title` e `description`.
  - Se o ID não for encontrado, uma mensagem de erro será retornada.
  - Caso a atualização seja bem-sucedida, os novos dados da mensagem serão retornados.

#### Deletar Mensagem

- **Método:** `DELETE`
- **Rota:** `/messages/:id`
- **Descrição:** Deleta uma mensagem existente com base no ID.
- **Como Usar:**
  - Faça uma requisição `DELETE` para a rota `/messages/:id`, substituindo `:id` pelo ID da mensagem.
  - Se o ID não for encontrado, uma mensagem de erro será retornada.
  - Caso a mensagem seja deletada com sucesso, uma mensagem de confirmação será retornada.

---


## Como Executar

1. Clone o repositório e navegue até o diretório do projeto.
2. Instale as dependências utilizando `npm install`.
3. Execute o servidor com `npm run dev` para o ambiente de desenvolvimento.
4. Acesse a API através da URL configurada no arquivo `.env`.