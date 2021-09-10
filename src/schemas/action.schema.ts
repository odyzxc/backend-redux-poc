import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActionDocument = Action & Document;

@Schema()
export class Action {
  @Prop()
  type: string;

  @Prop()
  payload: Record<string, unknown>;

  @Prop()
  timestamp: number;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
