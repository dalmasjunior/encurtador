# Encurtador de URL 
[![Build Status](https://travis-ci.org/dalmasjunior/encurtador.svg?branch=master)](https://travis-ci.org/dalmasjunior/encurtador)

Este Encurtador de URL foi desenvolvido com o intuito de testar e adquirir conhecimento no desenvolvimento de APIs com as tecnologias **NodeJs**, **TypeScript** e **Express**.
<br>
Além destas tecnologias foi utilizado como Banco de dados o **MongoDB**, CI/CD com **Travis** e deploy fetio no **Heroku**.

### How To

Para executar este projeto, primeiro será preciso instalar as dependências com o comando:
> npm install

Após a instalação execute os testes com o comando:
> npm test

E, finalmente, para rodar em ambiente *local* utilize o comando:
> npm run dev

### Play

Para encurtar uma url envie um *POST* para *http://localhost:8081/encurtador* com um *JSON* no body seguindo o exemplo abaixo:
> {
  "url": "http://wisereducacao.com"
}

A API irá encurtar a url, armazenar a informação no MongoDB e retornar a url com o código de acesso a url encurtada no formato *JSON*:
> {
  "newUrl": "http://localhost:8081/abc123def"
}

Por default cada url gerada terá um tempo de utilização de 2 dias, após esse período o código da url não será mais válido.

Para aumentar ou diminuir esse valor, altere a variável EXPIRATION_TIME dentro do arquivo **.env** .

Para testar acesse a url retornada em um navegador.
A API irá buscar no banco pelo código e irá redirecionar o navegador para a url original.