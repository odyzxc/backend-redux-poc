import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreService } from './store/store.service';
import { Snapshot, SnapshotSchema } from './schemas/snapshot.schema';
import { Action, ActionSchema } from './schemas/action.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/backend-redux-poc'),
    MongooseModule.forFeature([
      { name: Snapshot.name, schema: SnapshotSchema },
    ]),
    MongooseModule.forFeature([{ name: Action.name, schema: ActionSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, StoreService],
})
export class AppModule {}
