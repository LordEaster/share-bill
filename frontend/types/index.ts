export interface Friend {
    id: string;
    name: string;
    paid: boolean;
    paymentAddress?: string;
}

export interface OrderItem {
    id: string;
    description: string;
    amount: number;
    paidBy: string;
    assignedTo: string[];
}

export interface DebtCalculation {
    from: string;
    to: string;
    amount: number;
}

export interface ShareableData {
    friends: Friend[];
    orders: OrderItem[];
    timestamp: number;
}