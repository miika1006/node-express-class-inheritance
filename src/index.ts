import * as dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import { WebpackHotModule, app } from "./App";
import controllers from "./controllers";
import { repository } from "./repository/Repository";
import unknownEndpoint from "./middlewares/unknownEndpoint";

dotenv.config();

declare const module: WebpackHotModule;

app(express())
  .middleware([helmet(), cors(), json()])
  .port(process.env.PORT)
  .repo(repository())
  .controllers(controllers)
  .fail((msg: string) => {
    console.error(msg);
    process.exit(1);
  })
  .middleware([unknownEndpoint()])
  .start(module);
