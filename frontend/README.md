This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Frontend Inter Opera

## Installation

This app using yarn package manager as default package manager. make sure it is installed or adjust according to your package manager.
Then run command:

```bash
yarn install
```

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Running on Build

First, run the build command:

```bash
yarn build
```

then run command:

```bash
yarn start
```

# Architectural Decision

App is builded based on `Radically Simple` approach. The idea is to keep app as simple as possible, limiting resources and make most of used resources

## Explanation

Nextjs App will serve as Frontend and Orchestrator/Middleware for BE Processing. Aim is to be scalable while maintaining robust functionality even if sacrificing performance as long as it was not really hindering the interactiveness of the app.

## Redis

App is cached using redis. Redis will be used for other purposes as well (included but not limited) to:

-  Saving app jobs
-  Chat feature
-  Response caching
-  Chat history

## Backend Connections

App using API library which itself a nextjs server action which became stable nowadays. It is a api route without much exposing the route and strictly used to connection with Backend API.

Connection with backend also uses `Redis Pub/Sub` with `SSE` to overcome usual REST API limitation and giving `senses` of Realtime in some feature.

## Job Processing

Most Data Manipulation request will be handled by Queue. to simplify API Behaviour, response will be waiting job to finish using promise technique.

However in big scale application this behaviour can be changed to just listing all the jobs in a page for better responsiveness.

App also scalable when there's DB change (e.g: from sqlite to postgresql) just increase the concurency config in worker and app are good to go.
