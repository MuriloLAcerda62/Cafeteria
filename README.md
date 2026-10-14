# API REST - Cafeteria

CMP2304 - Tecnologia de Construção de Software I - Prova P2

Stack: Node.js, Express, nodemon, morgan, body-parser, CORS, mysql, MariaDB/MySQL.

## Como executar

1. Inicie o MySQL/MariaDB (ex.: XAMPP).
2. Execute o script `database.sql` (cria o banco `cafeteria` e a tabela `produto`).
3. Se necessário, ajuste usuário/senha em `src/config/db.js`.
4. Instale e rode:

```
npm install
npm start
```

Servidor em `http://localhost:3000`.

## Rotas

| Método | Rota           | Descrição           |
|--------|----------------|---------------------|
| GET    | /produto       | Lista produtos      |
| GET    | /produto/:id   | Busca um produto    |
| POST   | /produto       | Cria produto        |
| PUT    | /produto/:id   | Atualiza produto    |
| DELETE | /produto/:id   | Remove produto      |

Exemplo de body (POST/PUT):

```json
{ "nome": "Latte", "categoria": "Bebida quente", "preco": 11.5 }
```
