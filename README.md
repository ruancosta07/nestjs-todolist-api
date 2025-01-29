# Todo List - NestJS Restful API
### Essa é uma api simples construída com o framework NestJS. O projeto consiste em um gerenciador simples de tarefas, onde os usuários devem criar uma conta para poder utilizar o mesmo, nele os usuários podem criar, visualizar, editar e excluir as tarefas (CRUD).

## Documentação da api disponível <a href="https://nestjs-todolist-api.onrender.com/api">aqui</a>

Para rodar o projeto localmente, clone esse repositório e em seguida digite no terminal:

```bash
  yarn; yarn start:dev
```

Caso você use outro instalador de pacotes como o npm ou pnpm, exclua a pasta `yarn.lock` e em seguida execute o comando do instalador de pacotes no terminal: 

```bash
npm install; npm run start:dev
```

```bash
pnpm install; pnpm run start:dev
```

No arquivo `.env.example` há o exemplo das variáveis de ambiente utilziadas no projeto, basta apenas colocar os valores verdadeiros em cada uma. Caso você utilize o banco de dados MongoDB, troque a variável `DATABASE_URL` e em seguida digite no terminal: 

```bash
yarn dlx prisma db push
```

Caso você utilize outro banco de dados não esqueça de trocar o banco no arquivo `prisma/schema.prisma`
