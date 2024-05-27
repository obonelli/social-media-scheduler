import { Request, Response } from 'express';
import { NotificationOrchestrator } from '../services/NotificationOrchestrator';

export const schedulePost = async (req: Request, res: Response) => {
  const { post, scheduleDate } = req.body;
  const orchestrator = new NotificationOrchestrator();

  try {
    await orchestrator.schedulePost(post, scheduleDate);
    res.status(200).send('Post scheduled on all services');
  } catch (error) {
    res.status(500).send('Error scheduling post');
  }
};