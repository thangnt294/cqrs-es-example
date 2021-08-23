<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript with CQRS/ES pattern for dispatching events to RabbitMQ and storing events in CassandraDB.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Steps

- Copy the .env.example file and name it .env.
- Input the necessary environment variables, including those related to your RabbitMQ and CassandraDB.
- If need be, modify the cassandra_schema.cql file to bootstrap the CassandraDB with necessary tables.
- The app and the CassandraDB will be run by dockers. The RabbitMQ, however, will need to be run manually by you. You can use CloudAMQP (google it) or run an instance of your own.
- Run the docker-compose.yml file to bootstrap the spring-boot app along with the postgreSQL database. They will automatically connect to each other due to being in the same network. The command to run the file is "docker-compose up --build -V".
- Call the APIs listed within the controller to dispatch events to RabbitMQ and store them in CassandraDB.
- Use the spring-boot cqrs/es app to consume the messages and persist them in the query database.

