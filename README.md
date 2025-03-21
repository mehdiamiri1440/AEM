# Roman Numeral API

This project is an assignment for Adobe AEM's Software Engineer role. It demonstrates a complete backend service using Node.js and TypeScript with features including Roman numeral conversion, error monitoring with Sentry, observability using Prometheus + Grafana, and CI/CD deployment using GitHub Actions and Railway.

---

PROJECT STRUCTURE

.
├── .github/workflows/ci-cd.yml # GitHub Actions config for CI/CD pipeline
├── Dockerfile # Docker image for the app
├── docker-compose.yml # Optional local Docker config
├── prometheus/
│ ├── Dockerfile # Docker image for Prometheus
│ └── prometheus.yml # Prometheus config file
├── grafana/
│ ├── Dockerfile # Docker image for Grafana
│ └── grafana.ini # Grafana config file
├── src/
│ ├── index.ts # App entry point
│ ├── app.ts # Express app setup
│ ├── configs/
│ │ ├── dotenvConfig.ts # Loads .env config
│ │ ├── sentry.ts # Sentry setup
│ │ ├── server.ts # Server configuration
│ │ └── swagger.ts # Swagger/OpenAPI docs
│ ├── controllers/
│ │ ├── BaseController.ts # Base controller class
│ │ └── RomanNumeralController.ts# Business logic for conversion
│ ├── middlewares/
│ │ ├── RequestHandler.ts # Logs request
│ │ └── ResponseHandler.ts # Formats responses
│ ├── services/
│ │ ├── BaseService.ts
│ │ ├── LoggerService.ts
│ │ ├── MetricsService.ts # Prometheus metrics
│ │ └── RomanNumeralService.ts
│ ├── routes/
│ │ ├── BaseRouter.ts
│ │ ├── RomanNumeralRoutes.ts # /romannumeral route
│ │ └── debugRoutes.ts # /health and other diagnostics
│ ├── swagger/
│ │ ├── swagger.yml
│ │ ├── tags.yml
│ │ ├── components/
│ │ │ └── schemas.yml
│ │ └── paths/
│ │ ├── romannumeral.yml
│ │ └── health.yml
│ ├── enums/
│ │ └── HttpStatus.ts
│ ├── utils/
│ │ └── Validator.ts
│ ├── types/
│ │ └── RomanNumeralTypes.ts
│ └── tests/
│ ├── controllers/
│ │ └── RomanNumeralController.test.ts
│ ├── middlewares/
│ │ └── RequestHandler.test.ts
│ ├── routes/
│ │ ├── healthCheck.test.ts
│ │ └── romanNumeralRoutes.test.ts
│ └── services/
│ └── RomanNumeralService.test.ts

---

FEATURES

1. Roman numeral API

   - GET /romannumeral?query=44
   - Returns: { input: "44", output: "XLIV" }

2. Health check

   - GET /health

3. Swagger Documentation

   - Available at /api-docs

4. Prometheus Metrics

   - GET /metrics
   - Custom metrics: http_requests_total, http_response_time_seconds

5. Sentry Integration

   - Tracks runtime and unhandled errors

6. CI/CD with GitHub Actions

   - Runs tests
   - Builds the project
   - Uploads sourcemaps to Sentry
   - Deploys to Railway

7. Railway deployment
   - Project is deployable via `railway up`
   - Metrics and dashboard (optional: can be deployed via custom Docker setup)

---

USAGE

1. Build locally:

   docker build -t roman-numeral-api .

2. Run locally:

   docker run -p 8080:8080 --env-file .env roman-numeral-api

3. View documentation:

   http://localhost:8080/api-docs

4. View Prometheus metrics:

   http://localhost:8080/metrics

---

DEPLOYMENT ON RAILWAY

1. Make sure you're logged in to Railway CLI:

   railway login

2. Link your local repo to a Railway project:

   railway link

3. Deploy:

   railway up --service <your-service-name>

4. View logs:

   railway logs --service <your-service-name>

---

GRAFANA + PROMETHEUS DEPLOYMENT (optional)

1. Prepare directories:

   mkdir -p grafana prometheus

2. Add Dockerfiles and config:
   grafana/Dockerfile
   grafana/grafana.ini
   prometheus/Dockerfile
   prometheus/prometheus.yml

3. Deploy them to Railway:

   cd grafana && railway init --name grafana && railway up
   cd ../prometheus && railway init --name prometheus && railway up

---

NOTES

- Be sure to upload sourcemaps to Sentry using the GitHub Action
- Customize Grafana dashboard by importing Prometheus data
- Keep `.env` safe and DO NOT commit it

---

AUTHOR

Mehdi Amiri  
Assignment for Adobe AEM SWE Role
