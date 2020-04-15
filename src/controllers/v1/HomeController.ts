import { Application } from "express";
import BaseController, { AppController } from "./base/BaseController";
import { AppRepository } from "../../repository/Repository";

export default class HomeController extends BaseController
  implements AppController {
  constructor(app: Application, repository: AppRepository) {
    super("home/", app, repository);
  }
  configure() {
    console.log(`configuring HomeController with route '/'`);
    this.app.get("/", (req, res) => {
      res.send("<h1>HomeController</h1>");
    });
  }
}
