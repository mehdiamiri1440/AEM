import promClient from "prom-client";

export class MetricsService {
  private httpRequestDurationMicroseconds;

  constructor() {
    promClient.collectDefaultMetrics();

    this.httpRequestDurationMicroseconds = new promClient.Histogram({
      name: "http_request_duration_seconds",
      help: "Duration of HTTP requests in seconds",
      labelNames: ["method", "route", "status"],
      buckets: [0.1, 0.5, 1, 2, 5],
    });
  }

  observe(
    method: string,
    route: string,
    status: number,
    duration: number
  ): void {
    this.httpRequestDurationMicroseconds.observe(
      { method, route, status },
      duration
    );
  }
}
