<div align="center">
  <h1>SPRING-BOOT-CQRS-ES</h1>
</div>
<div align="center">
  <strong>Spring Boot service with RabbitMQ for queries</strong>
</div>

<br />

This is the service built for consuming messages from RabbitMQ and persist items in the database for further queries.

Stack: Spring-Boot, RabbitMQ, PostgreSQL.

## Steps

- Copy the src/main/resources/application-example.yml and name it application.yml.
- Input the corresponding host, queue, username and password for RabbitMQ host and queue you wish to subscribe to.
- You can also alter RabbitMQ's behavior by editing the configuration file at src/main/java/config/RabbitConfiguration.java.
- Build before running docker by using the command: ./gradlew build (add option "-x test" for skipping tests).
- Run the docker-compose.yml file to bootstrap the spring-boot app along with the postgreSQL database. They will automatically connect to each other due to being in the same network. The command to run the file is "docker-compose up --build".
- Use the publisher app to publish messages to RabbitMQ. This app will automatically consume the messages and persist the item in the postgreSQL in the database.
