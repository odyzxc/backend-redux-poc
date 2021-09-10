import { Controller, Get, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { StoreService } from './store/store.service';
import { selectCount } from 'src/features/counter/counter.selectors';
import { increment, decrement } from 'src/features/counter/counter.slice';

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
}
