import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Carregar variáveis de ambiente
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('VaciPet API')
    .setDescription(
      `API para gerenciar lembretes de vacinas e informações sobre pets, proporcionando uma solução eficiente para o acompanhamento da saúde dos pets.`,
    )
    .setVersion('1.0')
    .addTag('pets')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
