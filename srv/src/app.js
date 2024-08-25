const Fastify = require('fastify')
const fastifyCors = require('@fastify/cors')

const fastify = Fastify()

// Importar rotas

const userRoutes = require('./routes/user.routes')


// Registrar plugins
fastify.register(fastifyCors, {
  // Opções de configuração do CORS
  origin: '*', // Permitir todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
})

// Registrar rotas
fastify.register(index)
fastify.register(userRoutes)

// Iniciar o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 }) // Substitua pela porta que desejar
    console.log(`Servidor rodando na porta 3000`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()

module.exports = fastify
