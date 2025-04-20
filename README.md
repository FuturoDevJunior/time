# Boilerplate Express - FreeCodeCamp

Este projeto é o boilerplate oficial para os desafios de **Basic Node and Express** do [FreeCodeCamp](https://www.freecodecamp.org/learn/apis-and-microservices/basic-node-and-express/).

## Estrutura do Projeto

- **myApp.js**: Implementação das rotas e middlewares Express.
- **server.js**: Inicialização do servidor e integração com o ambiente de testes do FreeCodeCamp.
- **public/**: Arquivos estáticos (CSS, imagens, etc).
- **views/**: Templates HTML.
- **package.json**: Dependências e scripts do projeto.

## Deploy Automático

O deploy é realizado automaticamente na plataforma [Render](https://render.com/) a cada push na branch `main` do GitHub, utilizando um **Deploy Hook** e um workflow do GitHub Actions.

- **Root Directory no Render:** `boilerplate-express`
- **Start Command:** `npm start`
- **URL de produção:** [https://boilerplate-express-v8lr.onrender.com](https://boilerplate-express-v8lr.onrender.com)

## Como rodar localmente

```bash
cd boilerplate-express
npm install
npm start
```
Acesse: [http://localhost:3000/](http://localhost:3000/)

## Testando o endpoint `/now`

Acesse:
```
http://localhost:3000/now
```
Ou, em produção:
```
https://boilerplate-express-v8lr.onrender.com/now
```
Deve retornar:
```json
{ "time": "..." }
```

## Integração com GitHub Actions

O workflow `.github/workflows/deploy-render.yml` dispara o deploy automático no Render a cada push na branch `main`.

---

> Projeto mantido para fins educacionais e de certificação FreeCodeCamp.
// trigger redeploy
