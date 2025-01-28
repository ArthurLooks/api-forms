import { randomUUID } from 'node:crypto'
import pg from 'pg'

export const connect = async () => {
	if (global.connection) {
		return global.connection.connect()
	}

	const { Pool } = pg
	const pool = new Pool({
		connectionString: process.env.CONNECTION_STRING
	})

	const client = await pool.connect()
	client.release()

	global.connection = pool
	return pool.connect()
}


export const createLeads = async (lead) => {
    lead.id = randomUUID()

    const client = await connect()
    await client.query('INSERT INTO leads (id, nome, email, telefone) VALUES ($1, $2, $3, $4)', [lead.id, lead.nome, lead.email, lead.telefone])
    client.release()
}

export const getLeads = async (search) => {
    const client = await connect()
    let result

    if(search){
        result = await client.query('SELECT * FROM leads WHERE nome LIKE $1', [`%${search}%`])
    }else{
        result = await client.query('SELECT * FROM leads')
    }
    client.release()
    return result.rows
}

export const deleteLeads = async (id) => {
	const client = await connect()
	await client.query('DELETE FROM leads WHERE id = $1', [id])
	client.release()
}