import { PrismaClient } from "@prisma/client";

export enum ERRORS {
  INVALID_QUERY = "Query is invalid",
  SERVER_ERROR_500 = "500 Internal Server Error",
}

export interface Context {
  prisma: PrismaClient;
}