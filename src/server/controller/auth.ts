import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/config";
import { User, users } from "../../dtos/user";
import { ControllerPayload } from "./player.interface";

// Function to create a JWT token
function createJwtToken(userId: number): string {
  return jwt.sign({ userId }, env.JWT_SECRET_KEY, { expiresIn: "1h" });
}

// Function to generate a random score
function getRandomScore(): number {
  return Math.floor(Math.random() * 1000);
}


function signup(req: Request, res: Response) {
  const { username, password } = req.body;

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "Username already taken." });
  }

  // Create a new user and add it to the database (in reality, this is usually done in a database)
  const newUser: User = {
    id: users.length + 1,
    username,
    password,
    score: getRandomScore(),
  };
  users.push(newUser);

  // Create and return the JWT token
  const token = createJwtToken(newUser.id);
  res.json({ token });
}


function signin(req: Request, res: Response) {
  const { username, password } = req.body;

  // Find the user in the database
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid login credentials." });
  }

  // Create and return the JWT token
  const token = createJwtToken(user.id);
  res.json({ token });
}

export function buildAuthController({ app, urlPrefix }: Pick<ControllerPayload, "app" | "urlPrefix">) {
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
  app.post(`${urlPrefix}/signup`, signup);

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
  app.post(`${urlPrefix}/signin`, signin);
}
