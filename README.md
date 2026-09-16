<div align="center">

# 🧑‍💻 Code Editor Backend

**The API and execution layer for a browser-based code editor.**

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=111)](https://developer.mozilla.org/) [![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![REST API](https://img.shields.io/badge/API-REST-111)](#api)

</div>

## ✨ Overview

This service supports editor projects, files, sessions, and the backend workflows needed by the companion frontend.

## 🧱 Architecture

```mermaid
flowchart LR
  E[Editor Frontend] --> API[Node.js API]
  API --> AUTH[Auth and Validation]
  API --> FS[Project / File Services]
  FS --> DB[(Persistence)]
  API --> RUN[Optional Sandbox Runner]
```

## 🖼️ Screenshots

Backend project: add API documentation or request/response images to `docs/screenshots/`.

![API](docs/screenshots/api.png)

## ⚡ Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

## 🔌 API

Use the route definitions in the source as the source of truth for project, file, authentication, and execution endpoints.

## 🔒 Security

Never execute untrusted code directly in the API process. Use authentication, resource limits, isolated workers, and strict validation before production deployment.

## 📄 License

MIT License.
