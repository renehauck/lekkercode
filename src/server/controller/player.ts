import { ControllerPayload } from "./player.interface";
import { Request, Response } from "express";
import { PlayerService } from "../service/player"; // Import the PlayerService

/**
 * Build the Player Controller with specified routes and middleware.
 */
export function buildPlayerController({
  app,
  middleware,
  urlPrefix,
}: ControllerPayload) {
  const playerService = new PlayerService(); 

  /**
   * @swagger
   * /api/players:
   *   get:
   *     summary: Get all players.
   *     tags:
   *       - Players
   *     responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Player'
   */
  app.get(`${urlPrefix}/players`, ...middleware, playerService.getAll);

  /**
   * @swagger
   * /api/players:
   *   post:
   *     summary: Create a new player.
   *     tags:
   *       - Players
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Player'
   *     responses:
   *       201:
   *         description: Created.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Player'
   */
  app.post(`${urlPrefix}/players`, ...middleware, playerService.create);

  /**
   * @swagger
   * /api/players/{id}:
   *   get:
   *     summary: Get a player by ID.
   *     tags:
   *       - Players
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Player'
   *       404:
   *         description: Player not found.
   */
  app.get(`${urlPrefix}/players/:id`, ...middleware, playerService.get);

  /**
   * @swagger
   * /api/players/{id}:
   *   put:
   *     summary: Update a player by ID.
   *     tags:
   *       - Players
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Player'
   *     responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Player'
   *       404:
   *         description: Player not found.
   */
  app.put(`${urlPrefix}/players/:id`, ...middleware, playerService.update);

  // Swagger Kommentar für Delete a player by ID
  /**
   * @swagger
   * /api/players/{id}:
   *   delete:
   *     summary: Delete a player by ID.
   *     tags:
   *       - Players
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: No content.
   *       404:
   *         description: Player not found.
   */
  app.delete(`${urlPrefix}/players/:id`, ...middleware, playerService.remove);
}
