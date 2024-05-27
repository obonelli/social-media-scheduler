import { Request, Response } from 'express';
import { NotificationOrchestrator } from '../services/NotificationOrchestrator';

export const schedulePost = async (req: Request, res: Response) => {
  const { post, scheduleDate } = req.body;
  const orchestrator = new NotificationOrchestrator();

  if (!post || !scheduleDate) {
    return res.status(400).send('Post content or schedule date is missing');
  }

  try {
    await orchestrator.schedulePost(post, scheduleDate);
    res.status(200).send('Post scheduled on all services');
  } catch (error) {
    console.error('Error scheduling post:', error);
    res.status(500).send('Error scheduling post');
  }
};
