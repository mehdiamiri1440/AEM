# 🏛️ Roman Numeral API

> **Production-Ready Express.js App — Built for the Adobe AEM SWE Assignment**  
> Converts integers (1–3999) into Roman numerals with **full-stack observability**, **OOP architecture**, **CI/CD**, and **Dockerized deployment**.

---

## 🌍 Live Application URLs

- **📘 Swagger Docs:** [`/api-docs`](https://aem-production.up.railway.app/api-docs)
- **⚙️ Main Endpoint:** [`/romannumeral`](https://aem-production.up.railway.app/romannumeral?query=123)
- **📈 Metrics Endpoint (Prometheus):** [`/metrics`](https://aem-production.up.railway.app/metrics)
- **🩺 Health Check:** [`/health`](https://aem-production.up.railway.app/health)

---

## ⚙️ Core Functionality

### ➤ API Endpoint

```http
GET /romannumeral?query=123
```

Returns:

```json
{
  "input": "123",
  "output": "CXXIII"
}
```

---

## 📄 Documentation (GitHub Pages)

You can browse the full API TypeDoc documentation here:  
🔗 [https://mehdiamiri1440.github.io/AEM/](https://mehdiamiri1440.github.io/AEM/)

## 🔁 Data Flow (End-to-End)

1. **🌐 Incoming Request**

   - Enters through `src/index.ts`, handled by Express.
   - Routed to `/romannumeral` via `RomanNumeralRoutes.ts`.

2. **🔀 Routing Logic**

   - Routed via `BaseRouter.ts` → `RomanNumeralController.convert()`.

3. **📋 Validation Layer**

   - `Validator.ts` checks for presence, type, and range.

4. **🧠 Business Logic**

   - `RomanNumeralService.ts` handles conversion with clean, testable logic.

5. **📤 Response**

   - Wrapped by `ResponseHandler.ts` into standardized response shape.

6. **🪵 Logging**

   - Request logs captured by `LoggerService.ts` via Winston.

7. **📊 Metrics**

   - `MetricsService.ts` exposes `/metrics` to Prometheus.

8. **🩺 Health Check**

   - `/health` returns uptime + status.

9. **🚨 Error Monitoring**

   - Global errors are forwarded to **Sentry** via `instrument.ts`.

10. **📦 Instrumentation**
    - `instrument.ts` acts as a bootstrapper for Sentry, Prometheus, Winston.

---

## 🧠 Object-Oriented Architecture

- 🧱 **Controllers** inherit from `BaseController.ts`
- 🔁 **Routers** extend `BaseRouter.ts` for unified behavior
- 🧠 **Services** follow the **Single Responsibility Principle**
- 🔗 **Dependency Injection** used via modular imports
- 💎 **Polymorphism** ready — All base classes are extensible

---

## 📦 Folder Responsibilities

| Folder         | Responsibility                           |
| -------------- | ---------------------------------------- |
| `configs/`     | Sentry, Server, Env, Swagger setup       |
| `controllers/` | Route logic handling, validation         |
| `middlewares/` | Logging, request/response handlers       |
| `services/`    | Roman numeral logic, logging, metrics    |
| `utils/`       | Input validation utils                   |
| `types/`       | Custom interfaces/types                  |
| `swagger/`     | Fully modular OpenAPI 3.0 YAML structure |
| `tests/`       | Jest + Supertest with 85%+ coverage      |

---

## 🧪 Testing System

- ✅ Uses **Jest** for unit tests and **Supertest** for integration tests.
- 🧪 `test:watch`, `test:ci`, `test:verbose` included
- 📊 Run:

```bash
npm test
```

> 💡 Coverage reports include controller, service, middleware, and route layers.

---

## 📈 Observability

### 🔍 Sentry

- Config in `configs/sentry.ts`
- Linked to build via `sentry:sourcemaps` command
- Errors are auto-reported with full stack trace

### 📊 Prometheus

- Endpoint: `/metrics`
- Exposes:
  - `http_requests_total`
  - `http_response_time_seconds` histogram

### 📉 Grafana

- Dashboards pull from Prometheus
- Suggest using [Dashboard ID: 1860](https://grafana.com/grafana/dashboards/1860)

---

## 🔁 CI/CD on GitHub

- Full pipeline in `.github/workflows/ci-cd.yml`
- Trigger: `on: push` to `main`
- Phases:
  - ✅ Lint & Build
  - ✅ Test with coverage
  - 🚀 Auto deploy to **Railway**
  - 📡 Upload sourcemaps to Sentry

🔗 [GitHub Repo](https://github.com/mehdiamiri1440/AEM)

---

## 🐳 Dockerized Deployment

- Multi-stage Dockerfile:
  - Build → Test → Copy → Production
- Run locally with:

```bash
docker compose -f docker-compose.yml up --build
```

---

## 🔐 .env Setup

### `.env.example`

```env
PORT=8080
SENTRY_AUTH_TOKEN=your_sentry_auth_token
SENTRY_DSN=your_sentry_dsn
RAILWAY_SERVICE_ID=your_railway_service_id
RAILWAY_API_TOKEN=your_railway_api_token
```

---

## 📄 Swagger

**Local**: `http://localhost:8080/api-docs`  
**Production**: `https://aem-production.up.railway.app/api-docs`

Includes:

- `/romannumeral`
- `/health`
- Error schemas and examples

---

## 🧰 Dev Scripts

| Command                     | Description                  |
| --------------------------- | ---------------------------- |
| `npm run dev`               | Local dev with hot-reload    |
| `npm run build`             | Compile TS, copy swagger     |
| `npm test`                  | Run tests                    |
| `npm run generate-docs`     | Generate TypeDoc API docs    |
| `npm run sentry:sourcemaps` | Upload source maps to Sentry |

---

---

## 📘 GitHub Pages API Documentation

Full developer documentation is also available via **TypeDoc** and hosted on GitHub Pages:

🔗 [View API Docs](https://mehdiamiri1440.github.io/AEM/)

This documentation includes:

- Type-safe definitions of all services, controllers, and utilities
- Auto-generated from your `src/` directory
- Regenerated using:

```bash
npm run generate-docs
```

---

## 👨‍💻 Author

**Mehdi Amiri**  
[GitHub: @mehdiamiri1440](https://github.com/mehdiamiri1440)

_For the Adobe AEM SWE Assignment_
