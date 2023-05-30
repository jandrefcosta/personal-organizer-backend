
import { FastifyInstance } from 'fastify'
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function categoryRoutes(app: FastifyInstance) {

    app.addHook('preHandler', async (request) => {
        await request.jwtVerify();
    })

    app.get("/category", async (request) => {
        return await prisma.category.findMany();
    })

    app.post("/category", async (params) => {
        const bodySchema = z.object({
            name: z.string(),
        })

        const categoryData = bodySchema.parse(params.body);
        await prisma.category.create({
            data: {
                name: categoryData.name
            }
        })
    })
}