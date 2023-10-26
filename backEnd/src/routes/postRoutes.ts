// src/routes/postRoutes.ts
import { Router } from 'express';
import { create, getAll, search, getOne, update, remove } from '../controllers/postController';
import { validateToken } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /post:
 *   post:
 *     tags:
 *       - Post
 *     summary: Crea una nueva entrada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *                 format: date
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Entrada creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', validateToken, create);

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     tags:
 *       - Post
 *     summary: Obtiene el detalle de una entrada por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la entrada
 *     responses:
 *       200:
 *         description: Detalle de la entrada
 *       404:
 *         description: Entrada no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', validateToken, getOne);

/**
 * @swagger
 * /post:
 *   get:
 *     tags:
 *       - Post
 *     summary: Obtiene todas las entradas
 *     responses:
 *       200:
 *         description: Lista de entradas
 *       500:
 *         description: Error en el servidor
 */
router.get('/', validateToken, getAll);

/**
 * @swagger
 * /post/search:
 *   get:
 *     tags:
 *       - Post
 *     summary: Busca entradas por título, contenido o autor
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Texto de búsqueda
 *     responses:
 *       200:
 *         description: Lista de entradas que coinciden con la búsqueda
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.get('/search', validateToken, search);

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     tags:
 *       - Post
 *     summary: Actualiza una entrada por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la entrada a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *                 format: date
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entrada actualizada exitosamente
 *       404:
 *         description: Entrada no encontrada
 *       400:
 *         description: Error en la solicitud
 */
router.put('/:id', validateToken, update);

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     tags:
 *       - Post
 *     summary: Elimina una entrada por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la entrada a eliminar
 *     responses:
 *       204:
 *         description: Entrada eliminada exitosamente
 *       404:
 *         description: Entrada no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', validateToken, remove);

export default router;