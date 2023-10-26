// src/server.ts
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import sequelize from './config/database';
import cors from 'cors';

const app = express();
const port = Number(process.env.PORT) || 3001;


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog_API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with']
}));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/post', postRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
