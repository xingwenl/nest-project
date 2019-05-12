import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { ApiException } from "../exception/api.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: { getStatus: () => void; }, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        if (exception instanceof ApiException) {
            response
                .status(status)
                .json({
                    code: exception.getErrorCode(),
                    message: exception.getErrorMessage(),
                    date: new Date().toLocaleDateString(),
                    path: request.url
                })
        }
        else {
            response
            .status(status)
            .json({
                code: status,
                date: new Date().toLocaleDateString(),
                path: request.url
            })
        }
    }
}