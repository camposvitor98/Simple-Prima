import { prisma } from "../../infra/server";
import {  } from "@prisma/client";
import {} from 
export function UserRepository() {
  return prisma.user;
}

UserRepository().findMany()
