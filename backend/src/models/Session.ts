import mongoose, { Document, Schema } from 'mongoose';

// Define interfaces
interface IFriend {
    id: string;
    name: string;
    paid: boolean;
    paymentAddress?: string;
}

interface IOrderItem {
    id: string;
    description: string;
    amount: number;
    paidBy: string;
    assignedTo: string[]; // Array of friend IDs
}

export interface ISession extends Document {
    sessionId: string;
    friends: IFriend[];
    orders: IOrderItem[];
}

// Define Schemas
const FriendSchema: Schema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    paid: { type: Boolean, required: true },
    paymentAddress: { type: String },
});

const OrderItemSchema: Schema = new Schema({
    id: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: { type: String, required: true },
    assignedTo: { type: [String], required: true },
});

const SessionSchema: Schema = new Schema(
    {
        sessionId: { type: String, unique: true, required: true },
        friends: [FriendSchema],
        orders: [OrderItemSchema],
    },
    { timestamps: true }
);

export default mongoose.model<ISession>('Session', SessionSchema);