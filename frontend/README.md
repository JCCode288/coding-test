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

## Learn More

To learn more about Next.js, take a look at the following resources:

-  [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-  [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Running on Build

First, run the build command:

```bash
yarn build
```

then run command:

```bash
yarn start
```

## Architectural Decision

App is builded based on `Radically Simple` approach. The idea is to keep app as simple as possible, limiting resources and make most of used resources

### Redis

App is cached using redis. Redis will be used for other purposes as well (included but not limited) to:

-  Saving app jobs
-  Chat feature
-  Response caching
-  Chat history

### Backend Connections

App using API library which itself a nextjs server action which became stable nowadays. It is a api route without much exposing the route and strictly used to connection with Backend API.

Connection with backend also uses `Redis Pub/Sub` to overcome REST API limitation and giving `senses` of Realtime in some feature.
