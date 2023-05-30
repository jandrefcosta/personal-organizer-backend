import "@fastify/jwt"

declare module "@fastify/jwt" {
    interface FastifyJWT {        
        user: {
            sub: string
            nome: string
            email: string
        } // user type is return type of `request.user` object
    }
}
