# ChatBot
Api de ChatBot: Autoatendimento para restaurante

## Tecnologias utilizadas
- Node.js
- Express.js
- React
- TypeScript

## Endpoints Back-End
- `GET - http://localhost:3005`: Apenas para testes: Retorna um json no seu navegador para mostrar um json com todo o histórico do ChatBot

- `POST - http://localhost:3005/v1/chat`: Retorna UM JSON com a resposta do ChatBot, mas é necessário reenviar o "{client}" para receber a resposta do ChatBot corretamente (inicialmente, envie no body apenas "{ client: { id: '999', stage: 0, message: 'Olá' } }", e depois vá retornando o { client } que o ChatBot mandou, alterando apenas o "message" que seria a sua resposta para o ChatBot).

## Endpoints Front-End
- `GET - http://localhost:3000`: Rota única para o react

## Como utilizar
Clone o repositório no seu computador, instale as dependências e rode o
backend e o frontend ao mesmo tempo com o comando "`npm run start`"

```bash
git clone https://github.com/Everton-Lourens/bot.git
cd bot
npm install
npm run start
```
