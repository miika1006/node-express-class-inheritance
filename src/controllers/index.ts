import { AppController } from "./v1/base/BaseController";
import { Application } from "express";
import HomeController from "./v1/HomeController";
import ItemController from "./v1/ItemController";
import Repository from "../repository/Repository";

const controllers = (
  app: Application,
  repository: Repository
): AppController[] => [
  new HomeController(app, repository),
  new ItemController(app, repository)
];
export default controllers;
