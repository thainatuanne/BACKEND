import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

const app = express()
app.use(cors())
app.use(express.json())

let users = [];
let messages = [];

const isEmailRegistered = (email) => users.some(user => user.email === email)

app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Bem vindo à aplicação' 

    })
})

app.post('/signup', async (req, res) => {

    const { name, email, password } = req.body

    if (!name) return res.status(400).json({ 
        message: 'Por favor, verifique se passou o nome.' 

    })
    if (!email) return res.status(400).json({ 
        message: 'Por favor, verifique se passou o email.' 

    })
    if (isEmailRegistered(email)) return res.status(400).json({ 
        message: 'Email já cadastrado, insira outro.' 

    })
    if (!password) return res.status(400).json({ 
        message: 'Por favor, verifique se passou a senha.' 

    })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
    }

    users.push(newUser)

    return res.status(201).json({ 
        message: `Seja bem-vindo ${name}! Pessoa usuária registrada com sucesso!` 
    })
})

app.post('/login', async (req, res) => {

    const { email, password } = req.body

    if (!email) return res.status(400).json({ 
        message: 'Insira um e-mail válido.' 

    })

    if (!password) return res.status(400).json({ 
        message: 'Insira uma senha válida.' 

    })

    const user = users.find(u => u.email === email)

    if (!user) return res.status(404).json({ 
        message: 'Email não encontrado no sistema, verifique ou crie uma conta.' 

    })

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) return res.status(400).json({ 
        message: 'Senha incorreta.' 

    })

    return res.status(200).json({ 
        message: `Seja bem-vindo ${user.name}! Pessoa usuária logada com sucesso!` 
    })
})

app.post('/message', (req, res) => {

    const { email, title, description } = req.body

    if (!email) return res.status(400).json({ 
        message: 'Por favor, informe o email.' 

    })

    const user = users.find(u => u.email === email)

    if (!user) return res.status(404).json({ 
        message: 'Email não encontrado, verifique ou crie uma conta.' 

    })

    if (!title) return res.status(400).json({ 
        message: 'Por favor, verifique se passou o título da mensagem.' 

    })
    if (!description) return res.status(400).json({ 
        message: 'Por favor, verifique se passou a descrição da mensagem.' 

    })

    const newMessage = {
        id: uuidv4(),
        title,
        description,
        userId: user.id,
    }

    messages.push(newMessage)

    return res.status(201).json({ 
        message: `Mensagem criada com sucesso!`, data: newMessage })
})

app.get('/message/:email', (req, res) => {

    const { email } = req.params

    const user = users.find(u => u.email === email)

    if (!user) return res.status(404).json({ 
        message: 'Email não encontrado, verifique ou crie uma conta.' 

    })

    const userMessages = messages.filter(m => m.userId === user.id)

    return res.status(200).json({ 
        message: 'Mensagens recuperadas com sucesso!', data: userMessages 
    })
})

app.put('/message/:id', (req, res) => {

    const { id } = req.params

    const { title, description } = req.body

    const message = messages.find(m => m.id === id)

    if (!message) return res.status(404).json({ 
        message: 'Por favor, informe um id válido da mensagem.' 

    })

    if (title) message.title = title

    if (description) message.description = description

    return res.status(200).json({ 
        message: 'Mensagem atualizada com sucesso!', data: message 
    })
})

app.delete('/message/:id', (req, res) => {

    const { id } = req.params

    const messageIndex = messages.findIndex(m => m.id === id)

    if (messageIndex === -1) return res.status(404).json({ 
        message: 'Mensagem não encontrada, verifique o identificador em nosso banco.' 
    })

    messages.splice(messageIndex, 1)

    return res.status(200).json({ message: 'Mensagem apagada com sucesso' })
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})