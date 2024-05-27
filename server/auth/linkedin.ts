import passport from 'passport';
import { Strategy as LinkedInStrategy, Profile } from 'passport-linkedin-oauth2';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID!,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
  callbackURL: process.env.LINKEDIN_REDIRECT_URI!,
  scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social']
}, (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
  return done(null, { profile, accessToken });
}));

passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done: (err: any, user?: any) => void) => {
  done(null, obj);
});

// Middleware para asegurar autenticación
export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/linkedin');
}
