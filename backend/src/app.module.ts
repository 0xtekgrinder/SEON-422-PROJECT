import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplicaEntity } from './entities/replica.entity';
import { ActionEntity } from './entities/action.entity';
import { ActionService } from './action/action.service';
import { ReplicaService } from './replica/replica.service';
import { ReplicaController } from './replica/replica.controller';
import { ActionController } from './action/action.controller';

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { ValueController } from './value/value.controller';
import { ValueService } from './value/value.service';
import { ValueEntity } from './entities/value.entity';
import { TriggerService } from './trigger/trigger.service';
import { TriggerController } from './trigger/trigger.controller';
import { TriggerEntity } from './entities/trigger.entity';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
      );
    });

    next();
  }
}

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST'),
          port: configService.get<number>('POSTGRES_PORT'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DB'),
          synchronize: true,
          entities: [ReplicaEntity, ActionEntity, ValueEntity, TriggerEntity],
        };
      },
    }),
    TypeOrmModule.forFeature([ReplicaEntity, ActionEntity, ValueEntity, TriggerEntity]),],
  controllers: [AppController, ReplicaController, ActionController, ValueController, TriggerController],
  providers: [AppService, ActionService, ReplicaService, ValueService, TriggerService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
