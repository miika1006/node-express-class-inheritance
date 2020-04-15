import { AppController } from "./controllers/v1/base/BaseController";

import { Application, RequestHandler } from "express";
import { Server } from "http";
import Repository from "./repository/Repository";

/**
 * Application program interface
 */
export interface AppProgram {
  port: (port: string) => AppProgram;
  repo: (repo: Repository) => AppProgram;
  middleware: (handlers: RequestHandler[]) => AppProgram;
  controllers: (
    getControllers: (
      app: Application,
      repository: Repository
    ) => AppController[]
  ) => AppProgram;
  fail: (onExit: (msg: string) => void) => AppProgram;
  start: (module: WebpackHotModule) => Server;
  activateWebpackHMR: (server: Server, module: WebpackHotModule) => void;
}

/**
 * App
 */
export default class App implements AppProgram {
  constructor(app: Application) {
    this.app = app;
  }
  private app: Application;
  private repository: Repository | null = null;
  private serverPort: number = 0;
  private server: Server | null = null;

  /**
   * If fail, call on Exit with message
   * @param onExit callback function to call with string msg on failure
   * @return {App} this
   */
  fail = (onExit: (msg: string) => void) => {
    onExit;
    return this;
  };
  /**
   * Set port
   * @param port server port number.
   * @return {App} this
   */
  port = (port?: string) => {
    if (!port || port === "") throw new Error("port is not a number");
    this.serverPort = parseInt(port, 10);
    return this;
  };
  /**
   * Set repository
   * @param repo data repository
   * @return {App} this
   */
  repo = (repo: Repository) => {
    this.repository = repo;
    return this;
  };
  /**
   * Set middlewares
   * @param handlers array of middlewares
   * @return {App} this
   */
  middleware = (handlers: RequestHandler[]) => {
    handlers.forEach((handler) => this.app.use(handler));
    return this;
  };
  /**
   * setup controllers for all rest requests
   * @param getControllers function that returns controllers to use
   * @return {App} this
   */
  controllers = (
    getControllers: (
      app: Application,
      repository: Repository
    ) => AppController[]
  ) => {
    if (this.repository === null) throw Error("Repository must be set");
    const controllers = getControllers(this.app, this.repository);
    console.log("Configuring controllers (" + controllers.length + ")");
    controllers.forEach((i) => i.configure());
    return this;
  };
  /**
   * start application, and listen to port
   * @param module webpack hot module
   * @return {server} express
   */
  start = (module: WebpackHotModule) => {
    const appserver = this.app.listen(this.serverPort, () => {
      console.log(`Listening on port ${this.serverPort}`);
    });
    this.server = appserver;
    this.activateWebpackHMR(appserver, module);
    return appserver;
  };
  /**
   * Activate hot modules for webpack
   */
  activateWebpackHMR = (server: Server, module: WebpackHotModule) => {
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => server.close());
    }
  };
}

/**
 * Webpack HMR Activation
 */

export type ModuleId = string | number;

/**
 * Web pack hot module types
 */
export interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

export const app = (app: Application) => new App(app);
