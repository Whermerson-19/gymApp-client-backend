import { Request, Response, NextFunction } from "express";
import auth from "../config/auth";
import { verify } from "jsonwebtoken";

import AppError from "../errors/AppError";

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
  type: string;
}

export default class Authorization {
  public clientAuth(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const authHeaders = request.headers.authorization;
    if (!authHeaders) throw new AppError("JWT Token is missing");

    const [, token] = authHeaders.split(" ");

    const verifyToken = verify(token, auth.jwt.secret);
    if (!verifyToken) throw new AppError("Ivalid token", 401);

    const { sub, type } = verifyToken as IPayload;

    request.user = {
      id: sub,
      type,
    };

    if (type !== "client") throw new AppError("Only clients can use it", 403);

    return next();
  }

  public personalAuth(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const authHeaders = request.headers.authorization;
    if (!authHeaders) throw new AppError("JWT Token is missing");

    const [, token] = authHeaders.split(" ");

    const verifyToken = verify(token, auth.jwt.secret);
    if (!verifyToken) throw new AppError("Ivalid token", 401);

    const { sub, type } = verifyToken as IPayload;

    request.user = {
      id: sub,
      type,
    };

    if (type !== "personal")
      throw new AppError("Only personal can use it", 403);

    return next();
  }

  public teacherAuth(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const authHeaders = request.headers.authorization;
    if (!authHeaders) throw new AppError("JWT Token is missing");

    const [, token] = authHeaders.split(" ");

    const verifyToken = verify(token, auth.jwt.secret);
    if (!verifyToken) throw new AppError("Ivalid token", 401);

    const { sub, type } = verifyToken as IPayload;

    request.user = {
      id: sub,
      type,
    };

    if (type !== "teacher") throw new AppError("Only teachers can use it", 403);

    return next();
  }
}
