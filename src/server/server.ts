import bodyParser from "body-parser";
import express from "express";
import { env } from "../config/config";
import { buildAuthController } from "./controller/auth";
import { buildApiController } from "./controller/doc";
import { buildPlayerController } from "./controller/player";
import { buildTeamController } from "./controller/team";
import { authenticateToken } from "./middleware/auth";

const app = express();
const PORT = env.PORT;
const urlPrefix = env.API_PREFIX;

app.use(bodyParser.json());

// also possible to use middleware for all routes, but I want to be explicit about which routes are protected
// for example if we want to add a public route, we can do it without changing the middleware
// app.use(authenticateToken);

buildAuthController({ app, urlPrefix });
buildPlayerController({ app, middleware: [authenticateToken], urlPrefix });
buildTeamController({ app, middleware: [authenticateToken], urlPrefix });
buildApiController({ app });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
