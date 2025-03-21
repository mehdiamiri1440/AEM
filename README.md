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

---

## 📈 Observability Stack

### ✅ Prometheus

- Endpoint: `GET /metrics`
- Tracks:
  - `http_requests_total`
  - `http_response_time_seconds`

### 📊 Grafana

- Dashboards powered by Prometheus
- You can import pre-made dashboards from GrafanaLabs

### 🧠 Sentry

- Captures:
  - Unhandled exceptions
  - Stack traces with source maps
- Configured in `src/configs/sentry.ts`

---

## 🚀 Deployment

Deployed using **Docker** + **Railway**.

### 🔧 Dockerized Production

```bash
# Build and run locally
docker compose -f docker-compose.yml up --build
```

### 🌐 Railway Deployment

CI/CD is triggered on every `push` to `main`.

```bash
# First-time login
npm install -g @railway/cli
railway login
railway link
railway up
```

Prometheus and Grafana should be deployed as **independent Railway services**.

---

## 🧪 Testing

- Tests written with **Jest** and **Supertest**
- Coverage: 85%+
- Run all tests:

```bash
npm test
```

---

## 🧰 Developer Scripts

| Script                      | Description                             |
| --------------------------- | --------------------------------------- |
| `npm run dev`               | Start in watch mode (ts-node-dev)       |
| `npm run build`             | Compile TypeScript & prepare production |
| `npm test`                  | Run unit tests with coverage            |
| `npm run generate-docs`     | Generate TypeDoc API documentation      |
| `npm run sentry:sourcemaps` | Upload source maps to Sentry            |

---

## 📚 Documentation

Swagger auto-documentation available at:

```
GET /api-docs
```

Includes:

- `/romannumeral`
- `/health`
- Error response examples

---

## 💡 Designed With

- 🧰 TypeScript, Express.js
- 🎯 Clean Architecture
- 🧪 Full test coverage
- 📈 Prometheus + Grafana
- 🔥 Sentry for error logging
- 🚀 GitHub CI/CD → Railway
- 📄 Swagger API Docs
- 🏛️ Production-ready Docker setup

---

## 🧑‍💻 Author

**Mehdi Amiri**  
→ GitHub: [@mehdiamiri1440](https://github.com/mehdiamiri1440)

For the Adobe AEM SWE Interview Assignment
