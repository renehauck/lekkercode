import { Express, RequestHandler } from "express";

export interface ControllerPayload {
  app: Express;
  middleware: RequestHandler[];
    urlPrefix?: string;
}
