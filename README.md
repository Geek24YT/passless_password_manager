# Passless - Password Manager App

Passless is a modern password manager built using Next.js, TailwindCSS, Shadcn UI, and Clerk for user authentication. It allows users to securely store and manage passwords, access their vault, and keep their information encrypted. The app is fully responsive and provides a seamless user experience with both light and dark modes.

## Features

- **Secure Login & Signup**: User authentication via Clerk
- **Password Management**: Store, view, and manage passwords
- **Responsive UI**: Works on both light and dark themes
- **Optimized Performance**: Built with Next.js for fast load times
- **Styled with TailwindCSS**: Beautiful, modern UI components using TailwindCSS


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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Requirements

Before you start, make sure you have the following environment variables added to your `.env.local` file:

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = <your_clerk_publishable_key>`

`CLERK_SECRET_KEY=<your_clerk_secret_key>`

`NEXT_PUBLIC_CLERK_SIGN_IN_URL=<your_clerk_sign_in_url>`

## Demo

Below is a screenshot of the app's UI in both light and dark modes.

### Light Mode

![Light Mode Screenshot](path/to/light-mode-image.png)

### Dark Mode

![Dark Mode Screenshot](path/to/dark-mode-image.png)

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-name`)
6. Create a new Pull Request

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
