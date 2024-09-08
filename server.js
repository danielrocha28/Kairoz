import fastify from './src/app.js';

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await fastify.listen({ port })
    console.log(`Application Running on port: ${port}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()