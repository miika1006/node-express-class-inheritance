import { AppRepository } from "./../../repository/Repository";
import { Application } from "express";
import BaseController, { AppController } from "./base/BaseController";

export default class ItemController extends BaseController
  implements AppController {
  constructor(app: Application, repository: AppRepository) {
    super("item/", app, repository);
  }
  configure() {
    console.log(`configuring ItemController with default routes`);
    super.configure();
  }
}
