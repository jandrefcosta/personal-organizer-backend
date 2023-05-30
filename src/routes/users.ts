import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt';
import { z } from 'zod'
import { prisma } from '../lib/prisma';

export async function usersRoutes(app: FastifyInstance) {

    app.post("/user", async (params) => {
        
        const bodySchema = z.object({
            email: z.string(),
            password: z.string(),
            nome: z.string(),
            sobrenome: z.string(),
            perfilTipo: z.string(),
            avatar: z.string()
        })

        const user = bodySchema.parse(params.body);

        if (user) {
            bcrypt.genSalt(5, (err, salt) => {
                bcrypt.hash(user.password, salt, async (err, hash) => {
                    
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            password: hash,
                            nome: user.nome,
                            sobrenome: user.sobrenome,
                            perfilTipo: user.perfilTipo,
                            avatar: user.avatar
                        }
                    })
                })
            })
        }
    })

}