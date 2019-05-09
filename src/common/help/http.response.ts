import { HttpCode } from "@nestjs/common";
export class HttpRes {
    constructor(status: number, data?: object, message?: string) {
        this.status = status
        this.data = data
        this.message = message
    }
    status: number
    data?: object
    message?: string
}