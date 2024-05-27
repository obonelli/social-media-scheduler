import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LinkedInController from './controllers/linkedinController';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto por el origen de tu frontend
  credentials: true
}));

app.use(express.json());
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

import schedulePostRoutes from './routes/schedulePost';
app.use('/api', schedulePostRoutes);
app.use('/auth/linkedin', LinkedInController);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
