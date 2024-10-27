import express, { Request, Response } from 'express';
import Session, { ISession } from '../models/Session';

const router = express.Router();

// GET session data
router.get('/:sessionId', async (req: Request, res: Response) => {
    const { sessionId } = req.params;

    try {
        let session = await Session.findOne({ sessionId });
        if (!session) {
        session = new Session({ sessionId, friends: [], orders: [] });
        await session.save();
        }
        res.status(200).json({ friends: session.friends, orders: session.orders });
    } catch (error) {
        console.error('Error fetching session data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST update session data
router.post('/:sessionId', async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const { friends, orders } = req.body;

    try {
        await Session.findOneAndUpdate(
        { sessionId },
        { friends, orders },
        { new: true, upsert: true }
        );
        res.status(200).json({ message: 'Session data updated' });
    } catch (error) {
        console.error('Error updating session data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;