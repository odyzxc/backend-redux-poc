import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  configureStore,
  Store,
  PayloadAction,
  StateFromReducersMapObject,
} from '@reduxjs/toolkit';

import counter from 'src/features/counter/counter.slice';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Snapshot, SnapshotDocument } from '../schemas/snapshot.schema';
import { Action as DBAction, ActionDocument } from '../schemas/action.schema';

const reducer = {
  counter,
};

export type RootState = StateFromReducersMapObject<typeof reducer>;

@Injectable()
export class StoreService implements OnModuleInit, OnModuleDestroy {
  private store: Store;

  constructor(
    @InjectModel(Snapshot.name) private snapshotModel: Model<SnapshotDocument>,
    @InjectModel(DBAction.name) private actionModel: Model<ActionDocument>,
  ) {}

  async onModuleInit(): Promise<void> {
    const preloadedState = await this.snapshotModel.findOne(
      {},
      {},
      { sort: { timestamp: -1 } },
    );
    this.initStore(preloadedState?.state);
  }

  initStore(preloadedState) {
    this.store = configureStore({
      reducer,
      preloadedState,
    });
  }

  async dispatchAction(action: PayloadAction) {
    this.store.dispatch(action);
    await this.actionModel.create({
      type: action.type,
      payload: action.payload,
      timestamp: new Date().getTime(),
    });
  }

  getState() {
    return this.store.getState();
  }

  async onModuleDestroy(): Promise<void> {
    return this.saveSnapshot();
  }

  private async saveSnapshot() {
    await this.snapshotModel.create({
      state: this.getState(),
      timestamp: new Date().getTime(),
    });
  }
}
