import { Response } from "express";
import { HttpStatus } from "../enums/HttpStatus";
export class ResponseHandler {
  static success(res: Response, data: any): void {
    res.status(HttpStatus.OK).json({ success: true, data });
  }
  static error(
    res: Response,
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
  ): void {
    res.status(status).json({ success: false, message });
  }
}
