import express from 'express'

const app = express()

app.use(express.json())

const port = 8080

let veiculos = []
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
    };

    veiculos.push(novoVeiculo)
    return res.status(201).json({
        message: `Veículo ${modelo} foi adicionado com sucesso!`,
        novoVeiculo
    });
});

app.get('/veiculos', (req, res) => {
    if (veiculos.length === 0) {
        return res.status(200).send('Nenhum veículo cadastrado')
    }

    const listarVeiculos = veiculos.map(veiculo => 
        `ID: ${veiculo.id} | Modelo: ${veiculo.modelo} | Marca: ${veiculo.marca} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$${veiculo.preco.toFixed(2)}`
    ).join('\n')

    res.status(200).send(listarVeiculos)
});

app.get('/veiculos/marca/:marca', (req, res) => {
    const marcaFiltro = req.params.marca.toLowerCase()

    const veiculosFiltrados = veiculos.filter(veiculo => veiculo.marca.toLowerCase() === marcaFiltro)

    if (veiculosFiltrados.length === 0) {
        return res.status(404).send('Nenhum veículo encontrado para essa marca.')
    }

    const listaFiltrada = veiculosFiltrados.map(veiculo => 
        `ID: 1 | Modelo: ${veiculo.modelo} | Cor: ${veiculo.cor} | Preço: R$${veiculo.preco.toFixed(2)}`
    ).join('\n');

    res.status(200).send(listaFiltrada)
});

app.get('/', (req, res) => {
    res.status(200).send('Servidor rodando na porta 8080')
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})