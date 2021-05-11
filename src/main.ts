import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const options = {
  origin: '*',
  methods: ['GET', 'HEAD' ,'PUT', 'PATCH' ,'POST', 'DELETE'],
  preflightContinue: true,
  optionsSuccessStatus: 204,
  credentials: true
};

const PORT = 5000;

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors(options);
    const config = new DocumentBuilder()
      .setTitle('Music Service')
      .setDescription('The Music Service API description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
