export class AppError extends Error {
    code: number;
    isOperational = true;

    constructor(message: string, code: number) {
        super(message);
        this.code = code;

        Object.setPrototypeOf(this, AppError.prototype);
    }
}