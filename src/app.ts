import app from "@configs/server";
import { CONFIG } from "@configs/dotenvConfig";

export default function startServer(): void {
  app.listen(CONFIG.PORT, () => {
    console.log(`🚀 Server running at http://${CONFIG.HOST}:${CONFIG.PORT}/`);
  });
}
