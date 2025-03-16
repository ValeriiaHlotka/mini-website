import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Get the total number of visitors
        const totalVisitors = await prisma.visitor.count();

        // Get unique visitor count by IP address
        const uniqueVisitors = await prisma.visitor.groupBy({
            by: ['ipAddress'], // Group by IP address
            _count: {
                ipAddress: true, // Count the occurrences of each IP
            },
        });

        return new Response(
            JSON.stringify({
                totalVisitors,
                uniqueVisitors,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching visitors:', error);
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
}
