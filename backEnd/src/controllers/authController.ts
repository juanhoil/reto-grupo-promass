// src/controllers/authController.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';  // Asume que tienes un modelo de usuario

const SECRET_KEY = process.env.SECRET_KEY || '#1h5b2_943su*2=2gpe9k%zxt^!15!x+29=0jt8lo2##_n^p&c';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '30d' });  // Token expira en 30 dias

    res.json({ id: user.id, email: user.email, token });
};

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'El email ya está registrado' });

    // Crear nuevo usuario
    const user = await User.create({ email, password });

    // Generar token
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '30d' });

    res.status(201).json({ id: user.id, email: email, token });
};
