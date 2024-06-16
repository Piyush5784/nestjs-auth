import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true, trim: true, maxlength: 50 })
  username: string;

  @Prop({ required: true, trim: true, maxlength: 50 })
  email: string;

  @Prop({ required: true, trim: true, minlength: 6, maxlength: 50 })
  password: string;

  @Prop()
  role: 'admin';
}

export const adminSchema = SchemaFactory.createForClass(Admin);
