import { RomanNumeralController } from "@controllers/RomanNumeralController";
import { BaseRouter } from "@routes/BaseRouter";

class RomanNumeralRoutes extends BaseRouter {
  protected initializeRoutes(): void {
    this.router.get("/", RomanNumeralController.convert);
  }
}

export default new RomanNumeralRoutes().router;
