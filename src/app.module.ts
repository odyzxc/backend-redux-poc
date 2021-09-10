import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreService } from './store/store.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/backend-redux-poc')],
  controllers: [AppController],
  providers: [AppService, StoreService],
})
export class AppModule {}
