import Fastify from 'fastify'
import cors from '@fastify/cors'
import { connect, createLeads, getLeads, deleteLeads } from './db.js'

const db = await connect()

const server = Fastify()

await server.register(cors, {
	origin: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})

server.post('/leads', async (request, reply) => {
	let { nome, email, telefone } = request.body

	await createLeads({
		nome,
		email,
		telefone,
	})

	return reply.status(201).send('Cadastro realizado com sucesso')
})

server.get('/leads', async (request) => {
	let search = request.query.search
	let leads = await getLeads(search)
	return leads
})

server.delete('/leads/:id', async (request, reply) => {
	await deleteLeads(request.params.id)
	return reply.send('Lead deletado com sucesso')
})

server.listen({
	port: process.env.PORT,
})
