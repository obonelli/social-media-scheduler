import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/');
  }
);

export default router;
