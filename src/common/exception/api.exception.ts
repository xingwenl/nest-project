import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiErrorCode } from "../enums/api-error-code.enum";

export {
    ApiErrorCode
}

export class ApiException extends HttpException {
    private errorMessage: string;
    private errorCode: ApiErrorCode;

    constructor(errorCode: ApiErrorCode, errorMessage: string, statusCode = HttpStatus.OK) {
        super(errorMessage, statusCode);
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
    }

    getErrorCode(): ApiErrorCode {
        return this.errorCode;
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }
}