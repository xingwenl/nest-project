import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiErrorCode } from "../enums/api-error-code.enum";

export {
    ApiErrorCode
}

export class ApiException extends HttpException {
    private errorMessage: string;
    private errorCode: ApiErrorCode;
    private errorData: any

    constructor(errorCode: ApiErrorCode, errorMessage: string, statusCode = HttpStatus.OK, errorData = {}) {
        super(errorMessage, statusCode);
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.errorData = errorData
    }

    getErrorData(): any {
        return this.errorData
    }

    getErrorCode(): ApiErrorCode {
        return this.errorCode;
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }
}