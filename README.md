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

Create an .env file and specify a db url, for example:
```bash
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNzNmOWI4MzUtZmJhZS00M2QxLWFjYjAtZTBmY2UwYmRmMTRhIiwidGVuYW50X2lkIjoiMGQwYWQwZTI4ZTQ1MDE0ZTYyYThmYzkyOGY3NzY2NmU4ZTk2NzQ3MDdjM2M0NjU3NjI2ZGY3Y2I3NzlkMDMxNCIsImludGVybmFsX3NlY3JldCI6IjI0YzY1YjY0LWU3NmQtNDljMC04Yjk4LThjYzJlNTMxOGQ5NyJ9.Wz-let4kAOyQ7AWrj-SVIeA1nuf4iNqDblfjqDuinzM"
```

Run a migration:
```bash
npx prisma migrate dev --name init
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.