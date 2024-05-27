import { Request, Response, Router } from 'express';
import { LinkedInService } from '../services/LinkedInService';

const router = Router();
const linkedInService = new LinkedInService();

router.get('/callback', async (req: Request, res: Response) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('Code query parameter is missing');
  }
  
  try {
    await linkedInService.handleCallback(code as string);
    res.status(200).send('Successfully authenticated with LinkedIn');
  } catch (error) {
    console.error('Error during LinkedIn callback:', error);
    res.status(500).send('Error during LinkedIn authentication');
  }
});

router.post('/schedule-post', async (req: Request, res: Response) => {
  const { post, scheduleDate } = req.body;

  if (!post || !scheduleDate) {
    return res.status(400).send('Post content or schedule date is missing');
  }

  try {
    await linkedInService.schedulePost(post, scheduleDate);
    res.status(200).send('Post scheduled successfully');
  } catch (error) {
    console.error('Error scheduling post:', error);
    res.status(500).send('Error scheduling post');
  }
});

export default router;