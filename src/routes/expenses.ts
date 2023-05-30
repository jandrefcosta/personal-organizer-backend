
import { FastifyInstance } from 'fastify'
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function expensesRoutes(app: FastifyInstance) {

    app.addHook('preHandler', async (request) => {
        await request.jwtVerify();
    })

    app.get("/expenses", async (request) => {
        console.log(request.user.sub);
        return await prisma.expense.findMany();
    })

    app.post("/expenses", async (params) => {

        const bodySchema = z.object({
            tipoDespesa: z.string(),
            nomeDespesa: z.string(),
            valor: z.number(),
            parcelado: z.number(),
            vencimento: z.coerce.date(),
            dataPagamento: z.coerce.date(),
            userId: z.string(),
            categoriaId: z.number(),
            statusId: z.number(),
        })

        const expensesData = bodySchema.parse(params.body);

        await prisma.expense.create({
            data: {
                tipoDespesa: expensesData.tipoDespesa,
                nomeDespesa: expensesData.nomeDespesa,
                valor: expensesData.valor,
                parcelado: expensesData.parcelado,
                vencimento: expensesData.vencimento,
                dataPagamento: expensesData.dataPagamento,
                userId: expensesData.userId,
                categoriaId: expensesData.categoriaId,
                statusId: expensesData.statusId,
            }
        })
    })
}