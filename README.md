# 🧪 Bun + Express Benchmark Test

#### This test aimed to compare the performance and integration of Bun with an existing Node.js backend stack built with Express, Inversify, MongoDB, and Redis. The backend is a REST API microservice for the AnywrPOS platform.

### 🔧 Stack Used

```
Bun v1.2.16 vs Node.js v22
Express v4.21.1
MongoDB (via mongoose)
Redis (via ioredis)
InversifyJS (with inversify-express-utils)
Build tool: bun build vs esbuild (pnpm build)
Containerization: Multi-stage Dockerfile for both environments
```

### ⚙️ Comparison Metrics
```
Metric	                    Bun	                        Node.js
-----------------------------------------------------------------------
Docker build time	    ~7.3 seconds	        ~25.0 seconds
Final image size	    ~295 MB	                ~290 MB
App startup time	    ~83 ms	                ~81 ms
API TTFB (via APIDog)	    ~28 ms	                ~79 ms
```

### 📊 Observations
- Bun provides faster build and startup times.
- Node.js is more compatible, especially with packages like socket.io.
- Both are viable for production, especially when containerized via Docker.

### To install dependencies:

```bash
bun install
```

### To Build
```bash
bun build
```

### To run dev env:

```bash
bun run dev
```

### To run prod env:

```bash
bun run start
```

This project was created using `bun init` in bun v1.2.16. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
