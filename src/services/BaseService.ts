export abstract class BaseService {
  protected log(message: string): void {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
}
