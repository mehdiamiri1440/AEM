# Roman Numeral API

## Setup & Run

### Local Development

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`

### Production (Docker)

1. Build the Docker image: `docker build -t roman-numeral-api .`
2. Run the container: `docker run -p 8080:8080 roman-numeral-api`

Or use `docker-compose up -d` for an easier setup.

### API Endpoint

- `GET /romannumeral?query={integer}`: Convert an integer (1-3999) to a Roman numeral.
- `GET /metrics`: View Prometheus metrics for monitoring.
