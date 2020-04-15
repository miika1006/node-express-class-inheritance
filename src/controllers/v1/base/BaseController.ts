import { AppRepository } from "./../../../repository/Repository";
import { Application } from "express";

export interface AppController {
  configure: () => void;
}

export default abstract class BaseController implements AppController {
  protected app: Application;
  protected route: string;
  protected repository: AppRepository;
  protected baseRoute = "/api/";

  constructor(route: string, app: Application, repository: AppRepository) {
    this.app = app;
    this.route = this.baseRoute + route;
    this.repository = repository;
  }

  getAll() {
    console.log(`configuring getAll() with route '${this.route}'`);
    this.app.get(this.route, (request, response) => {
      response.json(this.repository.get());
    });
  }

  getById() {
    console.log(`configuring getById() with route '${this.route}:id'`);
    this.app.get(`${this.route}:id`, (request, response) => {
      const id = Number(request.params.id);
      let item = this.repository.getById(id);
      if (item) response.json(item);
      else response.status(404).end(); //not found
    });
  }

  create() {
    console.log(`configuring create() with route '${this.route}'`);
    this.app.post(this.route, (request, response) => {
      const body = request.body;
      if (!body) {
        //bad request
        return response.status(400).json({
          error: "data missing",
        });
      }
      this.repository.create(body);
      response.json(body);
    });
  }

  update() {
    console.log(`configuring update() with route '${this.route}:id'`);
    this.app.put(`${this.route}:id`, (request, response) => {
      const id = Number(request.params.id);
      const item = this.repository.getById(id);
      if (item) {
        const body = request.body;
        if (!body) {
          //bad request
          return response.status(400).json({
            error: "data missing",
          });
        }
        const created = this.repository.create(body);
        response.json(created);
      } else {
        response.status(404).end(); //not found
      }
    });
  }

  delete() {
    console.log(`configuring delete() with route '${this.route}:id'`);
    this.app.delete(`${this.route}:id`, (request, response) => {
      const id = Number(request.params.id);
      this.repository.deleteById(id);
      response.status(204).end(); //no content
    });
  }
  configure() {
    this.getAll();
    this.getById();
    this.create();
    this.update();
    this.delete();
  }
}
