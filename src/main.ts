<<<<<<< HEAD
// Add crypto polyfill at the very top
if (!global.crypto) {
  Object.defineProperty(global, 'crypto', {
    value: require('crypto'),
    writable: false,
    configurable: true
  });
}

=======
>>>>>>> 3ba02347a31ad41f2484a8a26dde9aa420dd583c
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Handler, Callback, Context } from 'aws-lambda';
import * as express  from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';


let cachedServer: Handler;

function getConfig(){
  const config = new DocumentBuilder()
    .setTitle('API Cataologus')
    .setDescription(
      'Esta API permite registrar categorias, productos, precio, imagenes, stock, presupuestos, ventas',
    )
    .setVersion('1.0')
    .build();
  return config;
}

async function bootstrapServer(): Promise<Handler> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.useGlobalPipes(new ValidationPipe());
  const config = getConfig()

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

  const config = getConfig()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  //app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}

if (require.main === module) {
  bootstrapLocal();
}
