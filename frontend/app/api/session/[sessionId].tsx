import { NextApiRequest, NextApiResponse } from 'next';
import { Friend, OrderItem } from '../../../types';

// In-memory store (Note: Use a database in production)
const sessions = new Map<
    string,
    { friends: Friend[]; orders: OrderItem[] }
>();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { sessionId } = req.query;

    if (typeof sessionId !== 'string') {
        res.status(400).json({ error: 'Invalid session ID' });
        return;
    }

    if (req.method === 'GET') {
        const sessionData = sessions.get(sessionId);
        if (sessionData) {
        res.status(200).json(sessionData);
        } else {
        res.status(200).json({ friends: [], orders: [] });
        }
    } else if (req.method === 'POST') {
        const { friends, orders } = req.body;
        sessions.set(sessionId, { friends, orders });
        res.status(200).json({ message: 'Session data updated' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}