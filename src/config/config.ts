import "dotenv/config";
import { cleanEnv, num, str } from "envalid";

export const env = cleanEnv(process.env, {
  JWT_SECRET_KEY: str(),
  PORT: num({ default: 3000 }),
  API_PREFIX: str({ default: "/api" }),
  NODE_ENV: str({
    choices: ["development", "test", "production", "staging"],
    default: "development",
  }),
});
