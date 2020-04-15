import { Request, Response, RequestHandler } from "express";

/**
 * Handle unknown endpoint
 * @param request
 * @param response
 */
const unknownEndpoint = () => (request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

export default unknownEndpoint;
