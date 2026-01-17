import 'dotenv/config';
import express from 'express';
import clienteRoutes from './routes/clienteRoutes.js';

const app = express();

// Middleware
app.use(express.json());

app.use('/', clienteRoutes);

export default app;

