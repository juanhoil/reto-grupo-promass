// src/config/database.ts
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Post } from '../models/Post';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password_default',
  database: process.env.DB_NAME || 'db_default',
  models: [User, Post], // Indicar la ubicación de los modelos
});
export default sequelize;