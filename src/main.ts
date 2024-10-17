import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
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
  // O Swagger estará disponível em http://localhost:3000/swagger

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
