import { Request, Response } from "express";
import { RomanNumeralService } from "@services/RomanNumeralService";
import { Validator } from "@utils/Validator";
import { BaseController } from "@controllers/BaseController";
import { HttpStatus } from "@enums/HttpStatus";

export class RomanNumeralController extends BaseController {
  static convert(req: Request, res: Response): void {
    const query = req.query.query;
    if (!Validator.isValidNumber(query)) {
      return new RomanNumeralController().sendError(
        res,
        "Invalid query parameter",
        HttpStatus.BAD_REQUEST
      );
    }
    const result = RomanNumeralService.toRoman(parseInt(query as string, 10));
    new RomanNumeralController().sendSuccess(res, {
      input: query,
      output: result,
    });
  }
}
