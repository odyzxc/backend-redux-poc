import { Injectable } from '@nestjs/common';
import {
  configureStore,
  Store,
  Action,
  StateFromReducersMapObject,
} from '@reduxjs/toolkit';

import counter from 'src/features/counter/counter.slice';

const reducer = {
  counter,
};

export type RootState = StateFromReducersMapObject<typeof reducer>;

@Injectable()
export class StoreService {
  private store: Store;

  // TODO move initStore out of constructor when rehydrating the state
  constructor() {
    const preloadedState = {};
    this.initStore(preloadedState);
  }

  initStore(preloadedState) {
    this.store = configureStore({
      reducer,
      preloadedState,
    });
  }

  dispatchAction(action: Action) {
    this.store.dispatch(action);
  }

  getState() {
    return this.store.getState();
  }
}
