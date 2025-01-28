import Fastify from 'fastify'
import { connect, createLeads, getLeads, deleteLeads } from './db.js'

const db = await connect()

const server = Fastify()

server.post('/leads', async (request, reply) => {
	const { nome, email, telefone } = request.body

	await createLeads({
		nome,
		email,
		telefone
	})

	return reply.status(201).send('Cadastro realizado com sucesso')
})

server.get('/leads', async (request) => {
	const search = request.query.search
	const leads = await getLeads(search)
	return leads
})

server.delete('/leads/:id', async (request, reply) => {
	await deleteLeads(request.params.id)
	return reply.send('Lead deletado com sucesso')
})

server.listen({
	port: process.env.PORT
})