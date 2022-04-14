This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To successfully run the project on localhost, you need to add a .env.local file in the root of the app directory. This file needs to have these values in the following format (without the curly brackets):

```
NEXT_PUBLIC_SERVER_URL={nice dcv server url}
NEXT_PUBLIC_USERNAME={nice dcv server username}
NEXT_PUBLIC_PASSWORD={nice dcv server password}
```

Since this project integrates NICE DCV, to run it on localhost, it needs to run over SSL. A simple way to use HTTPS on localhost is using [local-ssl-proxy](https://www.npmjs.com/package/local-ssl-proxy)

First, install ssl-proxy globally, and target the port 3000,

```
npm install -g local-ssl-proxy
local-ssl-proxy --source 3001 --target 3000
```

Then, on a separate terminal, run the development server:

```bash
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
