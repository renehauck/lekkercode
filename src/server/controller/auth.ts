import { AuthService } from "../service/auth";
import { ControllerPayload } from "./player.interface";



export function buildAuthController({ app, urlPrefix }: Pick<ControllerPayload, "app" | "urlPrefix">) {
  const authService = new AuthService();
  /**
   * Controller function for user signup.
   *
   * @swagger
   * /api/signup:
   *   post:
   *     summary: Register a new user.
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *             required:
   *               - username
   *               - password
   *     responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *       409:
   *         description: Username already taken.
   */
  app.post(`${urlPrefix}/signup`, authService.signup);

  /**
   * Controller function for user signin.
   *
   * @swagger
   * /api/signin:
   *   post:
   *     summary: Authenticate user and get a JWT token.
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *             required:
   *               - username
   *               - password
   *     responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *       401:
   *         description: Invalid login credentials.
   */
  app.post(`${urlPrefix}/signin`, authService.signin);
}
