
import { FastifyInstance } from 'fastify'
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function statusRoutes(app: FastifyInstance) {

    app.addHook('preHandler', async (request) => {
        await request.jwtVerify();
    })

    app.get("/status", async (request) => {
        return await prisma.status.findMany();
    })

    app.post("/status", async (params) => {
        const bodySchema = z.object({
            name: z.string(),
        })

        const statusData = bodySchema.parse(params.body);
        await prisma.status.create({
            data: {
                name: statusData.name
            }
        })
    })
}