import { NestFactory } from '@nestjs/core';
import { AppModule } from '@server/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Online chat server application')
    .setDescription('API Documentary')
    .setVersion('1.0.0')
    .addTag('v1')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/swagger', app, swaggerDocument);

  await app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`);
  });
}

start();
