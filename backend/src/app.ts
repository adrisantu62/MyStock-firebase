import express from 'express';
import cors from 'cors';

import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import healthRoutes from './routes/health.routes';
import meRoutes from './routes/me.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api', healthRoutes);
app.use('/api', meRoutes);

// Middleware de errores (SIEMPRE al final)
app.use(errorMiddleware);

export default app;
