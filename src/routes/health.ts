
import { FastifyInstance } from 'fastify'
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function healthRoutes(app: FastifyInstance) {
    app.get("/health", async (request) => {
        return { status: "OK" }
    })
}