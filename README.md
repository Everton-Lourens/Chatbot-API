﻿﻿﻿ChatBot API: Autoatendimento para restaurante

# ChatBot API
- Back-End (pricipal)
- Front-End

# Tópicos do README
- *Tecnologias Utilizadas*
- *Visão Geral*
- *Explicação Detalhada do Back-End*
- *Como utilizar Localmente*
- *Como utilizar com Docker*

## Tecnologias Utilizadas
- **Node.js**
- **Balanceador de carga: ngnix**
- **Docker**
- **Express.js**
- **React**
- **TypeScript**

## Visão Geral
- **Descrição do projeto**: Esta API oferece um chatbot de autoatendimento com múltiplas opções, permitindo que os clientes façam pedidos, consultem o cardápio, verifiquem a taxa de entrega ou solicitem atendimento humano, podendo se extender para outras funcionalidades futuras.

## Explicação Detalhada do Back-End

### **Balanceador de carga**:
O Back-End utiliza o **Nginx** como balanceador de carga para distribuir as requisições entre *duas (ou mais) instâncias do servidor*.

### **Cluster**:
Cada instância opera com um **cluster de 5 workers**, totalizando *10 processos ativos*, **evitando sobrecarga no servidor** caso tenha uma alta demanda de requisições, podendo aumentar ou diminuir os workers conforme demanda.

### **Fluxo de requisições no Nginx e no Cluster**:  
- O processo principal (master) cria múltiplos workers (processos filhos).
- Cada worker escuta as mesmas conexões, como se fosse uma cópia do servidor.
- O balanceador de carga Nginx recebe a requisição do cliente e decide para qual instância do servidor vai enviar.
- A instância repassa a requisição para um worker disponível no cluster (neste caso, 10 workers/processos).
- O sistema operacional distribui as requisições entre os workers de forma balanceada.
- Se um worker falhar, o master cria um novo automaticamente.

### **É possível adicionar, mas não foi utilizado**:
Toda pagina estática pode ser armazenada em cache (Redis ou Memcached) para melhorar o desempenho e reduzir ainda mais o custo da requisição.
*Obs:: Nginx também pode armazenar a página em cache.*

#### Endpoint Front-End
`GET - http://localhost:3000`

#### Endpoint Back-End

**Docker (nginx)**: `POST - http://localhost:9999/v1/chat`

**Localmente**: `POST - http://localhost:9999/v1/chat`

- **Descrição**: Este endpoint envia uma resposta do ChatBot em formato JSON. Para garantir que a conversa siga corretamente, você precisa reenviar o objeto `{ client }` a cada requisição.

### Como utilizar Localmente
- **Descrição**: Instale as dependências "`npm run setup`" e utilize "`npm run start`" para iniciar o Front-End *(localhost:3000)* e o Back-End *(localhost:9999)* ao mesmo tempo com a lib de desenvolvimento "`concurrently`".

```bash
git clone https://github.com/Everton-Lourens/chatbot-api.git
cd chatbot-api
npm run setup
npm run start
```

### Como utilizar com Docker
```bash
git clone https://github.com/Everton-Lourens/chatbot-api.git
cd chatbot-api
docker-compose up --build -d
```

#### Fluxo de uso:

- **Primeira Requisição**:
   Envie no corpo da requisição o objeto inicial com as informações do cliente, como no exemplo abaixo:

#### Obsevação: Como este é apenas um teste, você deve utilizar o seguinte JSON no corpo da requisição POST para garantir o funcionamento correto:

   ```json
   {
     "client": {
       "id": "999",
       "stage": 0,
       "message": "Olá"
     }
   }
  ```