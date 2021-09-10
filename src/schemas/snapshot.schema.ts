import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SnapshotDocument = Snapshot & Document;

@Schema()
export class Snapshot {
  @Prop({ type: Object })
  state: Record<string, unknown>;

  @Prop()
  timestamp: number;
}

export const SnapshotSchema = SchemaFactory.createForClass(Snapshot);
