import { players, Player } from "../../dtos/player";
import { ControllerPayload } from "./player.interface";
import { Request, Response } from "express";

/**
 * Build the Player Controller with specified routes and middleware.
 *
 * @param {ControllerPayload} options - The options object containing the Express app, middleware, and URL prefix.
 * @param {Object} options.app - The Express app to attach the routes to.
 * @param {Function[]} options.middleware - An array of middleware functions to be applied to the routes.
 * @param {string} options.urlPrefix - The URL prefix for all player routes.
 */
export function buildPlayerController({
  app,
  middleware,
  urlPrefix,
}: ControllerPayload) {
  /**
   * Get all players.
   *
   * @swagger
   * /api/players:
   *   get:
   *     summary: Get all players.
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
  app.get(
    `${urlPrefix}/players`,
    ...middleware,
    (req: Request, res: Response) => {
      res.json(players);
    }
  );

  /**
   * Create a new player.
   *
   * @swagger
   * /api/players:
   *   post:
   *     summary: Create a new player.
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
  app.post(
    `${urlPrefix}/players`,
    ...middleware,
    (req: Request, res: Response) => {
      const { id, rank, name, score, team } = req.body;
      const newPlayer: Player = { id, rank, name, score, team };
      players.push(newPlayer);
      res.status(201).json(newPlayer);
    }
  );

  /**
   * Get a player by ID.
   *
   * @swagger
   * /api/players/{id}:
   *   get:
   *     summary: Get a player by ID.
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
  app.get(
    `${urlPrefix}/players/:id`,
    ...middleware,
    (req: Request, res: Response) => {
      const player = players.find((p) => p.id === req.params.id);
      if (player) {
        res.json(player);
      } else {
        res.sendStatus(404);
      }
    }
  );

  /**
   * Update a player by ID.
   *
   * @swagger
   * /api/players/{id}:
   *   put:
   *     summary: Update a player by ID.
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
  app.put(
    `${urlPrefix}/players/:id`,
    ...middleware,
    (req: Request, res: Response) => {
      const { rank, name, score, team } = req.body;
      const player = players.find((p) => p.id === req.params.id);
      if (player) {
        player.rank = rank;
        player.name = name;
        player.score = score;
        player.team = team;
        res.json(player);
      } else {
        res.sendStatus(404);
      }
    }
  );

  /**
   * Delete a player by ID.
   *
   * @swagger
   * /api/players/{id}:
   *   delete:
   *     summary: Delete a player by ID.
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
  app.delete(
    `${urlPrefix}/players/:id`,
    ...middleware,
    (req: Request, res: Response) => {
      const index = players.findIndex((p) => p.id === req.params.id);
      if (index !== -1) {
        players.splice(index, 1);
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    }
  );
}
