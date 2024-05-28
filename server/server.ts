import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose.connect(MONGO_URI, {}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error conectando a MongoDB:', err);
});

app.use('/', routes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});