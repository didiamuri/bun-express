import type {NextFunction, Request, Response} from "express";
import {AppError} from "../utils/app-error.ts";

export default function badUrl(req: Request, res: Response, next: NextFunction) {
    next(new AppError(`Requested url ${req.path} not found`, 404));
}