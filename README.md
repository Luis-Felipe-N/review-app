# Review - APP
Aplica feita em Next.js, integrada com a API do Next.js e Prisma, destinada a pessoas que compram produtos importados e desejam compartilhar suas experiências com uma comunidade, permitindo que os usuários comentem e avaliem a qualidade dos produtos adquiridos..

![alt text](public/cover.png)


## Documentação da Aplicação :weight_lifting:
Este repositório contém a implementação do DeepReview uma aplicação construída em:
- Node.js 18
- NPM 9.8.1

## Instalação e configuração :computer:
- Faça o clone deste repositório: `git clone`
- Certifique-se de ter o Node.js 18 e NPM 9.8.1 instalados em sua máquina.
- Copie o arquivo **.env.example** para **.env** na raiz do projeto e defina as variáveis de ambiente necessárias para o seu ambiente.
- Execute `npm install` na pasta raiz do projeto para criar instalar as dependências.
- Execute `npx prisma migrate dev` para preparar o banco de dados.
- Por fim, execute `npm run dev` para subir a aplicação em modo de desenvolvimento.

## Endpoints :earth_americas:
A API oferece os seguintes endpoints:

**POST** api/users/ :👥:
Registra um novo usuário na base de dados.

**POST** api/review/create-review :🆕:
Registra uma nova review na base de dados.

**GET** api/review/ :📋👁️‍🗨️:
Retorna uma lista de reviews.

**GET** api/review/**:reviewId**/ :👁️‍🗨️:
Busca por uma review.

**PUT** api/review/**:reviewId**/complete  :✅:
Atualiza uma review com novos campos.

**POST** api/review/**:reviewId**/rating :📉:
Registra uma nova avaliação na base de dados.

**GET** api/review/**:reviewId**/rating :📉:
Retorna uma lista de avaliações da review.

**POST** api/review/**:reviewId**/comment :📨:
Registra um novo comentário na base de dados.

**GET** api/review/**:reviewId**/comment :📨:
Retorna uma lista de comentários da review.

## Autenticação :closed_lock_with_key:
A aplicação utiliza a api do nextAuth no modo Credentials, foi feita algumas modificações no authOptions, em relação às seções de ***authorize*** e ***session***.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível criar uma reviews;
- [x] Deve ser possível listar reviews;
- [x] Deve ser possível avaliar uma review;
- [x] Deve ser possível comentar em uma review;
- [x] Deve ser possível listar comentário de uma review;

## RNs (Regras de negócio)
- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;

## RNFs (Requisitos não-funcionais)
- [x] A senha do usuário precisa estar criptografada;
- [x] O usuário deve ser autenticado usando o NextAuth;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;