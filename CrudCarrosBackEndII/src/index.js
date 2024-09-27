import express from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

const app = express()
app.use(express.json())

const port = process.env.PORT || 8080  // Use process.env.PORT para produção

let veiculos = []
let usuarios = []
let idVeiculo = 1

app.post('/veiculos', (req, res) => {
    const { modelo, marca, ano, cor, preco } = req.body

    if (!modelo || !marca || !ano || !cor || !preco) {
        return res.status(400).send('Por favor, preencha todos os campos solicitados.')
    }

    const novoVeiculo = {
        id: idVeiculo++, 
        modelo,
        marca,
        ano,
        cor,
        preco
    }

    veiculos.push(novoVeiculo)
    return res.status(201).json({
        message: `Veículo ${modelo} foi adicionado com sucesso!`,
        novoVeiculo
    })
})

app.get('/veiculos', (req, res) => {
    if (veiculos.length === 0) {
        return res.status(200).send('Nenhum veículo cadastrado')
    }

    const listarVeiculos = veiculos.map(veiculo => 
        `ID: ${veiculo.id} | Modelo: ${veiculo.modelo} | Marca: ${veiculo.marca} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$${veiculo.preco.toFixed(2)}`
    ).join('\n')

    res.status(200).send(listarVeiculos)
})

app.get('/veiculos/marca/:marca', (req, res) => {
    const marcaFiltro = req.params.marca.toLowerCase();
    const veiculosFiltrados = veiculos.filter(veiculo => veiculo.marca.toLowerCase() === marcaFiltro)

    if (veiculosFiltrados.length === 0) {
        return res.status(404).send('Nenhum veículo encontrado para essa marca.')
    }

    const listaFiltrada = veiculosFiltrados.map(veiculo => 
        `ID: ${veiculo.id} | Modelo: ${veiculo.modelo} | Cor: ${veiculo.cor} | Preço: R$${veiculo.preco.toFixed(2)}`
    ).join('\n')

    res.status(200).send(listaFiltrada)
})

app.put('/veiculos/:id', (req, res) => {
    const { id } = req.params;
    const { cor, preco } = req.body

    const veiculo = veiculos.find(veiculo => veiculo.id === parseInt(id))

    if (!veiculo) {
        return res.status(404).send('Veículo não encontrado. Volte para o menu inicial.');
    }

    if (cor) veiculo.cor = cor
    if (preco) veiculo.preco = preco

    return res.status(200).json({
        message: `Veículo ID: ${id} foi atualizado com sucesso!`,
        veiculo
    })
})

app.delete('/veiculos/:id', (req, res) => {
    const { id } = req.params
    const index = veiculos.findIndex(veiculo => veiculo.id === parseInt(id))

    if (index === -1) {
        return res.status(404).send('Veículo não encontrado. Volte para o menu inicial.')
    }

    veiculos.splice(index, 1)

    return res.status(200).json({
        message: `Veículo ID: ${id} foi removido com sucesso!`
    })
})

app.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).send('Por favor, preencha todos os campos solicitados.')
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const novoUsuario = {
        id: uuidv4(),
        nome,
        email,
        senha: senhaCriptografada
    }

    usuarios.push(novoUsuario)
    return res.status(201).json({
        message: 'Usuário criado com sucesso!',
        novoUsuario: {
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            email: novoUsuario.email
        }
    })
})

app.post('/login', async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).send('Por favor, preencha todos os campos solicitados.')
    }

    const usuario = usuarios.find(user => user.email === email)

    if (!usuario) {
        return res.status(404).send('Usuário não encontrado.')
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)

    if (!senhaValida) {
        return res.status(400).send('Senha inválida.')
    }

    return res.status(200).send(`Usuário ${usuario.nome} logado com sucesso!`)
})

app.get('/', (req, res) => {
    res.status(200).send('Servidor rodando na porta 8080')
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})