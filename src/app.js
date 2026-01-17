import 'dotenv/config';
import express from 'express';
import clienteRoutes from './routes/clienteRoutes.js';
import livroRoutes from './routes/livroRoutes.js';
import emprestimoRoutes from './routes/emprestimoRoutes.js'

const app = express();

// Middleware
app.use(express.json());

app.use('/', clienteRoutes);
app.use('/', livroRoutes);
app.use('/', emprestimoRoutes)

export default app;

