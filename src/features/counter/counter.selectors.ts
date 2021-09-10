import type { RootState } from 'src/store/store.service';

export const selectCount = (state: RootState) => state.counter.value;
