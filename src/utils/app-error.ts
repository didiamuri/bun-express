export class AppError extends Error {
    public readonly statusCode: number;
    public readonly meta?: any;

    constructor(message: string, statusCode: number, meta?: any) {
        super(message);
        this.statusCode = statusCode;
        this.meta = meta;

        Error.captureStackTrace(this, this.constructor);
    }
}