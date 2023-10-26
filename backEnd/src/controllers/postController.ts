// src/controller/postController.ts

import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Post } from '../models/Post';

export const create = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const post = await Post.create(req.body);
        res.status(201).json({data:post});
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getOne = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    try {
        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ error: "Entrada no encontrada." });
        }

        res.status(200).json(post);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const post = await Post.findAll();
        res.status(200).json({data:post});
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const search = async (req: Request, res: Response) => {
    const query = req.query.query as string;

    if (!query) {
        return res.status(400).json({ error: "El parámetro de búsqueda es obligatorio." });
    }

    try {
        const post = await Post.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { content: { [Op.like]: `%${query}%` } },
                    { author: { [Op.like]: `%${query}%` } }
                ]
            }
        });
        res.status(200).json(post);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
  
    try {
        const post = await Post.findByPk(id);
  
        if (!post) {
            return res.status(404).json({ error: "Entrada no encontrada." });
        }
  
        const [count, updatedPosts] = await Post.update(req.body, {
          where: { id: id },
          returning: true, // Esto permite que Sequelize devuelva los registros actualizados
        });
  
        if (count === 0) {
          return res.status(404).json({ error: "Entrada no encontrada." });
        }
  
        res.status(200).json({data:updatedPosts[0]}); // Devuelve la entrada actualizada
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
  };

export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
      const post = await Post.findByPk(id);

      if (!post) {
          return res.status(404).json({ error: "Entrada no encontrada." });
      }

      await Post.destroy({
        where: {
          id: id
        }
      }); // Elimina la entrada

      res.status(204).send(); // 204 No Content para indicar que la entrada se eliminó con éxito
  } catch (error: any) {
      res.status(500).json({ error: error.message });
  }
};