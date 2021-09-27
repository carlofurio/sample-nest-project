import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ProductModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/sample-nest-database')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
