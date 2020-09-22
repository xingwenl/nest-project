import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
	ValidationError,
	Injectable,
} from '@nestjs/common';
import { ApiException } from '../exception/api.exception';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
		let data = {};
    if (exception instanceof ApiException) {
			data = {
        code: exception.getErrorCode(),
        message: exception.getErrorMessage(),
        date: new Date().toLocaleString(),
        path: request.url,
        data: exception.getErrorData(),
      }
      response.status(200).json(data);
    } else {
			data = {
        code: status,
        date: new Date().toLocaleString(),
        path: request.url,
        message: exception.message,
      };
      response.status(200).json(data);
		}
		// console.log(exception);
		// this.logger.log('data');
  }
}
