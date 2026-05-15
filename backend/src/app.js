const express = require('express')
const mysql = require('mysql2/promise')
const app = express()
const PORT = 4000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

async function db(formdata, status) {
  let connection = ''
  try {

    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'ez123'
    })
    
    await connection.execute(`CREATE DATABASE IF NOT EXISTS todolist`)
    await connection.changeUser({ database: 'todolist' })

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        status BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

      if (status === 'create') {
        await connection.execute(
            'INSERT INTO todos (name, description, status) VALUES (?, ?, ?)',
            [formdata.name, formdata.description, formdata.status]
        )
        return 'Успешно'
      }
      if (status === 'getTodos') {
        let [rows] = await connection.execute('SELECT * FROM todos')
        return rows
      }
      if (status === 'delete') {
        await connection.execute(`DELETE FROM todos WHERE ID = ${formdata}`)
        return 'Успешно'
      }
      if (status === 'change-status') {
        if (formdata.status === '0') {
          await connection.execute(`UPDATE todos SET status = '0' WHERE id = ${formdata.id}`)
        } else {
          await connection.execute(`UPDATE todos SET status = '1' WHERE id = ${formdata.id}`)
        }
        console.log(await connection.execute(`SELECT * FROM todos WHERE id = ${formdata.id}`))
        return 'Успешно'
      }

  } catch (e) {
    console.log(e)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}


app.get('/api/todos', async (req, res) => {
    let response = await db('', 'getTodos')
    res.json(response)
});

app.post('/api/todos', async (req, res) => {
    let formdata = req.body
    let response = await db(formdata, 'create')
    res.json(response)
});

app.patch('/api/todos/:id', async (req, res) => {
   let formdata = {
    id: req.params.id,
    status: req.body.status
   }
   let response = await db(formdata, 'change-status')
   res.json(response)
});

app.delete('/api/todos/:id', async (req, res) => {
   let id = req.params.id
   let response = await db(id, 'delete')
   res.json(response)
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})