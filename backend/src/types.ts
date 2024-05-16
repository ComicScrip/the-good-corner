import User from "./entities/user";
import express from "express";
import { SesionService } from "./services/SessionService";

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
  sessionStore: SesionService;
}

export interface JWTPayload {
  userId: number;
}
