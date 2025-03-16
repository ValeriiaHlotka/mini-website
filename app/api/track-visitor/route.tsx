import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        // Get the IP address from the 'x-forwarded-for' header or fall back to 'undefined'
        const ip = req.headers.get('x-forwarded-for') || 'Unknown IP';

        // Save the visitor to the database
        await prisma.visitor.create({
            data: {
                ipAddress: ip as string
            },
        });

        return new Response(JSON.stringify({ message: 'Visitor saved' }), { status: 200 });
    } catch (error) {
        console.error('Error saving visitor:', error);
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
}
