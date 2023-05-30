import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt';
import { z } from 'zod'
import { prisma } from '../lib/prisma';

export async function authRoutes(app: FastifyInstance) {
    app.post('/auth', async (request, reply) => {
        const bodySchema = z.object({
            email: z.string(),
            password: z.string()
        })
        const { email, password } = bodySchema.parse(request.body);

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (user) {
            await bcrypt.compare(password, user.password)
                .then((result) => {
                    if (result) {
                        const token = app.jwt.sign({ nome: user.nome, email: user.email }, {
                            sub: user.id,
                            expiresIn: '30 days'
                        })
                        reply.send(token)
                    }
                }).catch((err) => {
                    // Handle any errors that occur during the comparison
                });
        }
    })
}