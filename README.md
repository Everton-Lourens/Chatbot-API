# ChatBot
API de ChatBot: Autoatendimento para restaurante

## Tecnologias Utilizadas
- **Node.js**
- **Express.js**
- **React**
- **TypeScript**

## ChatBot API

### Endpoint Front-End

#### `GET - http://localhost:3000`

- **Descrição**: Depois de instalar as dependências, é só entrar e conversar com o ChatBot.

### Endpoint para Back-End

#### `GET - http://localhost:3005`

- **Descrição**: Este endpoint é utilizado apenas para testes. Ele retorna um JSON com todo o histórico da sua conversa com o ChatBot diretamente no seu navegador.

##### Obsevação: É necessário ter iniciado a conversa para que mostre o histórico, Obviamente...

#### `POST - http://localhost:3005/v1/chat`

- **Descrição**: Este endpoint envia uma resposta do ChatBot em formato JSON. Para garantir que a conversa siga corretamente, você precisa reenviar o objeto `{ client }` a cada requisição.

##### Fluxo de uso:

1. **Primeira Requisição**:
   Envie no corpo da requisição o objeto inicial com as informações do cliente, como no exemplo abaixo:

##### Obsevação: Como é apenas um teste, você só poderá usar esse objeto abaixo para funcionar corretamente.

   ```json
   {
     "client": {
       "id": "999",
       "stage": 0,
       "message": "Olá"
     }
   }



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
