import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AppModule,
    ConfigModule.forRoot(),
    // 環境変数から取得することを推奨します
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'password',
      logging: true,
      database: 'test',
      entities: ['dist/**/entities/**/*.entity.js'],
      migrations: ['dist/**/migrations/**/*.js'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
