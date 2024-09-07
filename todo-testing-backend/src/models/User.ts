// src/models/User.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
}

const userSchema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true }
});

export const UserModel = mongoose.model<User>('User', userSchema);
