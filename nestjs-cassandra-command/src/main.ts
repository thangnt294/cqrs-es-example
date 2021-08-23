import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from '../config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: [
  //         'amqps://nnjrnbqc:O1Cydsh4kStWue-XtkDmRRpju0j_mj54@elk.rmq2.cloudamqp.com/nnjrnbqc',
  //       ],
  //       queue: 'item_queue',
  //       queueOptions: {
  //         durable: false,
  //       },
  //     },
  //   },
  // );

  const app = await NestFactory.create(AppModule);

  // Init Swagger
  const documentOptions = new DocumentBuilder()
    .setTitle(config.APP_NAME)
    .setDescription(config.APP_DESCRIPTION)
    .setVersion(config.VERSION)
    .setBasePath(`/${config.PREFIX}`)
    .build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup(config.API_EXPLORER_PATH, app, document);

  // Start app
  await app.listen(3000);
}
bootstrap().then();
