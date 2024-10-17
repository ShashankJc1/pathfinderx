This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Deploy on Vercel

The easiest way to deploy Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.



## Folder Structure

```
├── README.md
├── app
|   ├── api
│   |   ├── login
│   |   ├── signup
│   |   ├── contact-us
│   |   ├── dashboard
│   |   ├── user
|   ├── pages
|   │   ├── contact-us
|   │   ├── dashboard
|   │   ├── discover
|   │   ├── how-do-we-work
|   │   ├── login
|   │   ├── signup
|   │   ├── services
|   │   ├── profile
|   │   ├── file-upload
|   │   ├── layout.tsx
|   │   ├── page.tsx
├── components
│   ├── Button.tsx
│   ├── Camp.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── GetApp.tsx
│   ├── Guide.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── TravelCalendar.tsx
├── constants
│   ├── index.ts
├── lib
│   ├── mongodb.ts
├── models
│   ├── user.ts
├── middleware.ts
├── public
