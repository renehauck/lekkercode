import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { ControllerPayload } from "./player.interface";

export function buildApiController({ app }: Pick<ControllerPayload, "app">) {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "My API",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        schemas: {
          Player: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              position: { type: "string" },
            },
          },
          Team: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              ownerName: { type: "string" },
              totalScore: { type: "number" },
              memberNumber: { type: "number" },
              availableMemberNumber: { type: "number" },
            },
          },
        },
      },
    },
    apis: [
      "./src/server/controller/player.ts", 
      "./src/server/controller/team.ts", 
    ],
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
