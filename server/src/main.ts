import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all routes
  app.use(cors());

  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('Demo Project')
    .setDescription('Demo project API Description')
    .setVersion('1.0')
    .addTag('demo')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(process.env.PORT);
}

bootstrap()
  .then(() => {
    console.log(`Server: http://localhost:${process.env.PORT}`);
    console.log(`Swagger: http://localhost:4000/api/v1/docs`);
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
