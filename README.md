**This app is deployed on Vercel and can be accessed [here](https://nasa-sand-five.vercel.app/).**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The app is a simple web application that fetches data from the NASA API and displays the data in a responsive grid layout. The app is built using React, Next.js, Tailwind CSS, and Vitest / React Testing Library for testing.

The app is built based on [shadcn/ui](https://ui.shadcn.com/) design.

## Getting Started

First, install the dependencies:

```bash
npm install --force
# note: --force is used to force the installation of the dependencies because of react rc@19 version, which is incompatible with the some of the dependencies (e.g. @radix-ui/)
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

To run the tests, run the following command:

```bash
npm run test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
