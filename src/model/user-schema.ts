import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true, maxlength: 50 })
  username: string;

  @Prop({ required: true, trim: true, maxlength: 50 })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ default: ['user'] })
  roles: ['user'];
}

export const userSchema = SchemaFactory.createForClass(User);
