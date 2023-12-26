import User from "./entities/user";
import express from "express";

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
}

export interface JWTPayload {
  userId: number;
}
