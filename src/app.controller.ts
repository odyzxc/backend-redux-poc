import { Controller, Get, Patch, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { StoreService } from './store/store.service';
import { selectCount } from 'src/features/counter/counter.selectors';
import {
  increment,
  decrement,
  incrementBy,
} from 'src/features/counter/counter.slice';

type IncrementByRequestBody = {
  amount: number;
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly storeService: StoreService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('counter')
  getCounterState() {
    const state = this.storeService.getState();
    return selectCount(state);
  }

  @Patch('increment')
  increment() {
    this.storeService.dispatchAction(increment());
  }

  @Patch('decrement')
  decrement() {
    this.storeService.dispatchAction(decrement());
  }

  @Patch('incrementBy')
  incrementBy(@Body() { amount }: IncrementByRequestBody) {
    this.storeService.dispatchAction(incrementBy(amount || 1));
  }
}
