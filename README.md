# Vacipet

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descrição Geral

O projeto VaciPet é um sistema que visa ajudar tutores de pets a gerenciar as vacinas de seus animais de estimação. Através de notificações e lembretes automáticos, o VaciPet garante que os tutores se lembrem das datas de vacinação com três dias de antecedência, permitindo uma melhor organização e cuidado com a saúde dos pets.

## Contexto

Com a crescente preocupação com a saúde e bem-estar dos animais de estimação, muitos tutores enfrentam dificuldades em lembrar as datas das vacinas necessárias, que muitas vezes precisam ser aplicadas em intervalos específicos ao longo do ano. O VaciPet surgiu para solucionar esse problema, centralizando as informações de vacinação e simplificando a gestão das doses e intervalos.

## Público-alvo

O sistema é voltado para tutores de pets de todas as idades que desejam manter a saúde de seus animais em dia. O projeto também é útil para veterinários e clínicas que desejam ajudar seus clientes a gerenciar a vacinação de forma eficiente.

## Escopo do Projeto

### Funcionalidades principais

- **Cadastro de Pets**: Permitir que os tutores criem perfis para seus animais, informando dados como nome, idade e tipo de vacina.
- **Lembretes Automáticos**: Enviar notificações push aos tutores lembrando-os das vacinas que precisam ser aplicadas, com três dias de antecedência.
- **Alteração de Dados**: Permitir que os tutores atualizem as informações de seus pets.
- **Deletar Pets**: Permitir a remoção de registros de pets da base de dados.
- **Histórico de Vacinação**: Registrar e visualizar o histórico de vacinas aplicadas para cada animal.

### Requisitos

#### Requisitos Funcionais

- O sistema deve permitir o cadastro de pets, incluindo informações como nome, idade, e tipo de vacina.
- O sistema deve enviar notificações automáticas para os tutores, lembrando sobre a vacinação.
- O sistema deve permitir a visualização e atualização dos dados dos pets.
- O sistema deve permitir deletar o cadastro de um pet.

#### Requisitos Não Funcionais

- O sistema deve ser intuitivo e fácil de usar, mesmo para pessoas com pouca experiência.

## Tecnologias utilizadas

| Ferramenta | Descrição                                        |
| ---------- | ------------------------------------------------ | --- |
| NestJS     | Framework para construir aplicativos Node.js     |
| Node.js    | Ambiente de execução do JavaScript               |
| TypeScript | Superset do JavaScript que se integra ao Node.js |
| Postgres   | Banco de dados relacional                        |
| TypeORM    | Biblioteca para interagir com Postgres           |
| Swagger    | Framework para gerar a documentação da API       |
| AWS SNS    | Serviço para envio de notificações push          |
| AWS S3     | Serviço de armazenamento em nuvem                |     |
| JWT        | Usado para autenticação e autorização            |     |

## Instalação e Execução do Aplicativo

Para instalar e executar o VaciPet, siga as instruções abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/IzabelAzoia/vacipet.git
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd vacipet
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Para iniciar o aplicativo, use os seguintes comandos:

   - Modo de desenvolvimento:

     ```bash
     npm run start
     ```

   - Modo de observação (com recompilação automática):

     ```bash
     npm run start:dev
     ```

   - Modo de produção:
     ```bash
     npm run start:prod
     ```

5. Para executar os testes:
   ```bash
   npm run test
   ```

## Rotas

### Pets

- `GET /pets` - Lista todos os pets disponíveis para adoção.
- `POST /pets` - Cadastra um pet na base de dados.
- `PUT /pets/:id` - Atualiza os detalhes de um pet.
- `DELETE /pets/:id` - Remove um pet da base de dados.

### Usuários

- `GET /users` - Lista todos os usuários cadastrados.
- `POST /users` - Cadastra um novo usuário.
- `PUT /users/:id` - Atualiza os dados de um usuário.
- `DELETE /users/:id` - Remove um usuário da base de dados.

## Documentação

A documentação da API pode ser acessada pelo [Swagger](https://.com/home).

## Implementações futuras

- Integração com clínicas veterinárias: Parcerias para que os tutores possam agendar consultas diretamente pelo aplicativo.
- Relatórios de saúde: Gerar relatórios sobre a saúde dos pets, com histórico de vacinas e consultas.
- Recursos Educativos: Disponibilizar informações sobre cuidados com pets e a importância da vacinação.

<p align="center">Projeto Final desenvolvido durante a Turma-ON36-ImersãoJS com AWS da <a href="https://reprograma.com.br/">{reprograma}</a></p>
<p align="center">Feito com 💜 by Maria Izabel Castro Azoia</p>

## License

Nest é MIT licensed.
