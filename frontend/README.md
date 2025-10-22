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

## Signage Platform

This project is scaffolded with Next.js, TypeScript, Tailwind CSS, ShadCN UI, Framer Motion, Ant Design, Mongoose, and Cloudinary.

## Getting Started

1. Clone the repo and install dependencies:
	```
	npm install
	```
2. Set up environment variables in `.env.local`:
	- `MONGODB_URI=your_mongodb_connection_string`
	- `CLOUDINARY_CLOUD_NAME=your_cloud_name`
	- `CLOUDINARY_API_KEY=your_api_key`
	- `CLOUDINARY_API_SECRET=your_api_secret`
3. Run the development server:
	```
	npm run dev
	```

## Structure
- Public Website: `/src/app` (pages, components)
- Admin Panel: `/src/app/admin`
- Database Models: `/src/models`
- API Routes: `/src/app/api`
- UI Components: `/src/components`
- Utilities: `/src/lib`

## Tech Stack
- Next.js
- Tailwind CSS
- ShadCN UI
- Framer Motion
- Ant Design
- MongoDB Atlas + Mongoose
- Cloudinary

## Next Steps
- Build public pages (Home, Services, Portfolio, Contact)
- Build admin panel (CRUD, image upload, inquiry management)
- Add authentication for admin
- Prepare for future React Native mobile app

---

For more details, see the step-by-step guide in the project documentation.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
