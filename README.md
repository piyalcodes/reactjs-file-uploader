![React Application Architecture](../docs/c4-model.jpg)

# Architectaral docuemnts

[Architecture Decision Record (ADR)](https://docs.google.com/document/d/1MHshtdQwIIn2zC7x8wXjJPXI88ytCzL-/edit?usp=drive_link&ouid=116849936694237059139&rtpof=true&sd=true)

[Product Requirements Document (PRD)](https://docs.google.com/document/d/1ZrpHoVidzimEG6Uwq0LS0euXxX4ZZ8zn/edit?usp=drive_link&ouid=116849936694237059139&rtpof=true&sd=true)

# My Monorepo Project

This repository contains a full-stack project with a **Hono backend** and a **React frontend**. Both apps can be run independently or together via a single command.

---

## Project Structure

/api -> Hono backend

/app -> ReactJS frontend

/package.json (root) -> project-level scripts

---

## Getting Started

Available Scripts

From the root directory, you can run:

Script Description

`npm run dev:api` Starts only the Hono backend API (/api)

`npm run dev:app` Starts only the React frontend (/app)

`npm run dev` Starts both API and React app concurrently

### Prerequisites

- Node.js v18+ (or your preferred version)
- npm v9+

Clone the repository and install dependencies:

```bash
git clone https://github.com/piyalcodes/reactjs-file-uploader

```

npm install on app level

# Start both API and React app

`npm run dev` on the root

Backend API will run at: http://localhost:3010

React frontend will run at: http://localhost:5173
