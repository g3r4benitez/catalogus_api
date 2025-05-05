import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Handler, Callback, Context } from 'aws-lambda';
import * as express  from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';


let cachedServer: Handler;

async function bootstrapServer(): Promise<Handler> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('API Cataologus')
    .setDescription(
      'Esta API permite registrar categorias, productos, precio, imagenes, stock, presupuestos, ventas',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.init();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  cachedServer = cachedServer ?? (await bootstrapServer());
  return cachedServer(event, context, callback);
};

async function bootstrapLocal() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API CIDI')
    .setDescription('Esta api permite interactuar con los servicios de CIDI')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  //app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}

if (require.main === module) {
  bootstrapLocal();
}
