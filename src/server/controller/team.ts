import { TeamService } from "../service/team";
import { createTeamSchema } from "../validation/team";
import { validateSchema } from "../validation/utils";
import { ControllerPayload } from "./player.interface";

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
  const teamService = new TeamService();
  /**
   * Get all teams.
   *
   * @swagger
   * /api/teams:
   *   get:
   *     summary: Get all teams.
   *     tags:
   *       - Teams
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
  app.get(`${urlPrefix}/teams`, ...middleware, teamService.getAll);

  /**
   * Create a new team.
   *
   * @swagger
   * /api/teams:
   *   post:
   *     summary: Create a new team.
   *     tags:
   *       - Teams
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateTeam'
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
    teamService.create
  );

  /**
   * Get a team by ID.
   *
   * @swagger
   * /api/teams/{id}:
   *   get:
   *     summary: Get a team by ID.
   *     tags:
   *       - Teams
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
  app.get(`${urlPrefix}/teams/:id`, ...middleware, teamService.get);

  /**
   * Update a team by ID.
   *
   * @swagger
   * /api/teams/{id}:
   *   put:
   *     summary: Update a team by ID.
   *     tags:
   *       - Teams
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
  app.put(`${urlPrefix}/teams/:id`, ...middleware, teamService.update);

  /**
   * Delete a team by ID.
   *
   * @swagger
   * /api/teams/{id}:
   *   delete:
   *     summary: Delete a team by ID.
   *     tags:
   *       - Teams
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
  app.delete(`${urlPrefix}/teams/:id`, ...middleware, teamService.remove);

  /**
   * @swagger
   * /api/join-team:
   *   post:
   *     summary: Send a join request to join a team.
   *     tags:
   *       - Teams
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userId:
   *                 type: string
   *               teamId:
   *                 type: string
   *             required:
   *               - userId
   *               - teamId
   *     responses:
   *       200:
   *         description: OK. Join request sent successfully.
   *       404:
   *         description: Team not found.
   *       409:
   *         description: Join request already sent or team is full.
   *       500:
   *         description: Internal Server Error.
   */

  app.post(`${urlPrefix}/teams/join`, ...middleware, teamService.joinTeam);

  /**
   * Controller function for rejecting a join request.
   *
   * @swagger
   * /api/reject-join-request:
   *   post:
   *     summary: Reject a join request for a team.
   *     tags:
   *       - Teams
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               requestId:
   *                 type: string
   *               teamId:
   *                 type: string
   *             required:
   *               - requestId
   *               - teamId
   *     responses:
   *       200:
   *         description: OK. Join request rejected successfully.
   *       401:
   *         description: Unauthorized. You must be the team owner to reject join requests.
   *       403:
   *         description: Forbidden. The provided join request ID or team ID is invalid.
   *       404:
   *         description: Join request not found or team not found.
   *       500:
   *         description: Internal Server Error.
   */
  app.post(
    `${urlPrefix}/reject-join-request`,
    ...middleware,
    teamService.rejectJoinRequest
  );
}
