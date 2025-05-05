import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriaModule } from './categorias/categorias.module';
import { ArticulosModule } from './articulos/articulos.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'postgres'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'webcheckin_user'),
        password: configService.get('DB_PASSWORD', 'webcheckin_password'),
        database: configService.get('DB_NAME', 'webcheckin_db'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        retryAttempts: 10,
        retryDelay: 3000,
        synchronize: true, //configService.get('ENVIRONMENT_NAME') !== 'production', // Should be false in production
        logging: configService.get('ENVIRONMENT_NAME') !== 'production',
      }),
      inject: [ConfigService],
    }),
    UtilsModule, CategoriaModule, ArticulosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}