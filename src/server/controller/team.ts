import { teams, Team } from "../../dtos/team";
import { ControllerPayload } from "./player.interface";
import { Request, Response } from "express";
import { validateSchema } from "../validation/utils";
import { createTeamSchema } from "../validation/team";

/**
 * Build the Team Controller with specified routes and middleware.
 *
 * @param {ControllerPayload} options - The options object containing the Express app, middleware, and URL prefix.
 * @param {Object} options.app - The Express app to attach the routes to.
 * @param {Function[]} options.middleware - An array of middleware functions to be applied to the routes.
 * @param {string} options.urlPrefix - The URL prefix for all team routes.
 */
export function buildTeamController({
  app,
  middleware,
  urlPrefix,
}: ControllerPayload) {
  /**
   * Get all teams.
   *
   * @swagger
   * /api/teams:
   *   get:
   *     summary: Get all teams.
   *     responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Team'
   */
  app.get(
    `${urlPrefix}/teams`,
    ...middleware,
    (req: Request, res: Response) => {
      res.json(teams);
    }
  );

  /**
   * Create a new team.
   *
   * @swagger
   * /api/teams:
   *   post:
   *     summary: Create a new team.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Team'
   *     responses:
   *       201:
   *         description: Created.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Team'
   */
  app.post(
    `${urlPrefix}/teams`,
    ...middleware,
    validateSchema(createTeamSchema), // Validate the request body against the createTeamSchema
    (req: Request, res: Response) => {
      const { name, memberNumber } = req.body;

      // Create a new team and add it to the database
      const newTeam: Team = {
        id: (teams.length + 1).toString(),
        name,
        ownerName: req.user.name, // Assuming you have middleware that populates the authenticated user information in req.user
        totalScore: 0,
        memberNumber,
        availableMemberNumber: memberNumber,
      };
      teams.push(newTeam);

      res.status(201).json(newTeam);
    }
  );

  /**
   * Get a team by ID.
   *
   * @swagger
   * /api/teams/{id}:
   *   get:
   *     summary: Get a team by ID.
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
   *               $ref: '#/components/schemas/Team'
   *       404:
   *         description: Team not found.
   */
  app.get(
    `${urlPrefix}/teams/:id`,
    ...middleware,
    (req: Request, res: Response) => {
      const team = teams.find((t) => t.id === req.params.id);
      if (team) {
        res.json(team);
      } else {
        res.sendStatus(404);
      }
    }
  );

  /**
   * Update a team by ID.
   *
   * @swagger
   * /api/teams/{id}:
   *   put:
   *     summary: Update a team by ID.
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
   *             $ref: '#/components/schemas/Team'
   *     responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Team'
   *       404:
   *         description: Team not found.
   */
  app.put(
    `${urlPrefix}/teams/:id`,
    ...middleware,
    (req: Request, res: Response) => {
      const {
        name,
        ownerName,
        totalScore,
        memberNumber,
        availableMemberNumber,
      } = req.body;
      const team = teams.find((t) => t.id === req.params.id);
      if (team) {
        team.name = name;
        team.ownerName = ownerName;
        team.totalScore = totalScore;
        team.memberNumber = memberNumber;
        team.availableMemberNumber = availableMemberNumber;
        res.json(team);
      } else {
        res.sendStatus(404);
      }
    }
  );

  /**
   * Delete a team by ID.
   *
   * @swagger
   * /api/teams/{id}:
   *   delete:
   *     summary: Delete a team by ID.
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
   *         description: Team not found.
   */
  app.delete(
    `${urlPrefix}/teams/:id`,
    ...middleware,
    (req: Request, res: Response) => {
      const index = teams.findIndex((t) => t.id === req.params.id);
      if (index !== -1) {
        teams.splice(index, 1);
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    }
  );
}
