# 🏛️ Roman Numeral API

An end-to-end production-grade Express.js application built for the Adobe AEM team SWE assignment. This API converts integers (1–3999) to Roman numerals while implementing industry-standard practices including observability (Prometheus, Grafana, Sentry), CI/CD, health monitoring, and full test coverage.

---

## ⚙️ Core Functionality

### ➤ API Endpoint

`GET /romannumeral?query=123`  
Returns:

```json
{
  "input": "123",
  "output": "CXXIII"
}
```

---

## 🔁 Data Flow (End-to-End)

Here's what happens when a user sends a request to `GET /romannumeral?query=44`:

1. **🌐 Incoming Request**

   - Enters via `Express.js` app in `src/index.ts`
   - Handled by `app.use('/romannumeral', RomanNumeralRoutes)`

2. **🔀 Routing Logic**

   - Routed to `src/routes/RomanNumeralRoutes.ts`
   - Passes to `RomanNumeralController.convert`

3. **📋 Validation Layer**

   - `src/utils/Validator.ts` checks:
     - Is `query` present?
     - Is it an integer?
     - Is it within the 1-3999 range?
   - If invalid → throws a `400 Bad Request`

4. **🧠 Business Logic**

   - Valid input reaches `RomanNumeralService.toRoman`
   - Handles conversion using clean algorithmic logic

5. **📤 Response**

   - Controller wraps the result using `ResponseHandler.ts`
   - Outputs JSON response: `{ input: "44", output: "XLIV" }`

6. **🪵 Logging**

   - Every request/response is logged via `LoggerService.ts`

7. **📊 Metrics**

   - `MetricsService.ts`:
     - Increments Prometheus counters
     - Tracks response time histogram
   - Available at `/metrics`

8. **🩺 Health Check**

   - `/health` reports uptime and status

9. **🚨 Error Monitoring**

   - Uncaught errors reported to **Sentry**
   - Captured from centralized error middleware

10. **📦 Instrumentation**
    - `instrument.ts` injects monitoring (Sentry, Prometheus, Logger) globally

---

## 📦 Important Folders & Files

### `src/configs`

- `dotenvConfig.ts` – Loads `.env` variables
- `server.ts` – Creates and configures Express app
- `sentry.ts` – Initializes and connects Sentry
- `swagger.ts` – Sets up Swagger middleware

### `src/controllers`

- `BaseController.ts` – Shared behavior for all controllers
- `RomanNumeralController.ts` – Handles `/romannumeral` route logic

### `src/enums`

- `HttpStatus.ts` – Named constants for HTTP response codes

### `src/middlewares`

- `RequestHandler.ts` – Logs requests
- `ResponseHandler.ts` – Wraps responses uniformly

### `src/routes`

- `BaseRouter.ts` – Shared logic across all routers
- `RomanNumeralRoutes.ts` – Main endpoint routes
- `debugRoutes.ts` – Development-only routes

### `src/services`

- `BaseService.ts` – Optional parent service
- `LoggerService.ts` – Uses Winston to log to console/files
- `MetricsService.ts` – Exposes Prometheus metrics
- `RomanNumeralService.ts` – Core conversion logic

### `src/tests`

- Uses `Jest` and `Supertest` to verify routes, services, and controllers

### `src/types`

- `RomanNumeralTypes.ts` – Custom types/interfaces

### `src/utils`

- `Validator.ts` – Validation helpers

### `src/swagger`

- `swagger.yml`, `tags.yml`, `components/`, `paths/` – OpenAPI 3.0 schema

---

## 🧠 OOP Design

- **Controllers** extend `BaseController`
- **Routers** inherit shared logic from `BaseRouter`
- **Services** encapsulate business logic (SRP principle)
- **Middlewares** are injectable and replaceable
- **DI (Dependency Injection)** done via imports and service layering
- **Polymorphism** and extensibility built-in

---

## 📈 Observability Stack

### ✅ Prometheus

- Endpoint: `GET /metrics`
- Metrics exposed:
  - `http_requests_total`
  - `http_response_time_seconds`

### 📊 Grafana

- Dashboards sourced from Prometheus
- You can import dashboards from GrafanaLabs (e.g. Dashboard ID `1860`)

### 🧠 Sentry

- Captures:
  - Uncaught errors
  - Stack traces with sourcemaps
- Connected via `sentry.ts` and `instrument.ts`

---

## 🔐 .env & Secrets

### `.env.example`

```env
PORT=8080
SENTRY_AUTH_TOKEN=your_sentry_auth_token
SENTRY_DSN=your_sentry_dsn
RAILWAY_SERVICE_ID=your_railway_service_id
RAILWAY_API_TOKEN=your_railway_api_token
```

---

## 📄 Swagger Documentation

**Railway URL**: `https://aem-production-xxxx.up.railway.app/api-docs`  
**Example API call**:  
`https://aem-production-xxxx.up.railway.app/romannumeral?query=44`  
**Returns**:

```json
{ "input": "44", "output": "XLIV" }
```

---

## 🚀 Deployment

### 🐳 Docker

```bash
docker compose -f docker-compose.yml up --build
```

### 🌐 Railway

```bash
npm install -g @railway/cli
railway login
railway link
railway up
```

Prometheus and Grafana should be deployed as **separate Railway services**.

---

## 🧪 Testing

```bash
npm test
```

> Coverage: 85%+

---

## 👨‍💻 Author

**Mehdi Amiri**  
→ GitHub: [@mehdiamiri1440](https://github.com/mehdiamiri1440)  
For the Adobe AEM SWE Assignment
