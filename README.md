### Getting Started

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

Create an .env file and specify a DATABASE_URL.

Run a migration:
```bash
npx prisma migrate dev --name init
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.