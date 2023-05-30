import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { authRoutes } from './routes/auth';
import { usersRoutes } from './routes/users';
import { expensesRoutes } from './routes/expenses';
import { statusRoutes } from './routes/status';
import { categoryRoutes } from './routes/category';

const app = fastify();

app.register(cors, { origin: true })
app.register(jwt, { secret: 'spacetime' })

app.register(authRoutes)
app.register(usersRoutes)

app.register(statusRoutes)
app.register(categoryRoutes)

app.register(expensesRoutes)


app.listen({ port: 3333, }).then(() => {
  console.log('server running port: 3333')
})
