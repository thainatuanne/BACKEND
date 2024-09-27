let veiculos = [];
let latestId = 1;

// CREATE 
function criarVeiculo() {
    const modelo = prompt("Informe o modelo do veículo:");
    const marca = prompt("Informe a marca do veículo:");
    const ano = prompt("Informe o ano do veículo (ex: 2014/2015):");
    const cor = prompt("Informe a cor do veículo:");
    const preco = parseFloat(prompt("Informe o preço do veículo (ex: 40000):"));

    if (isNaN(preco)) {
        alert('Preço inválido. O veículo não foi adicionado.');
        return;
    }

    const veiculo = {
        id: latestId++,
        modelo: modelo,
        marca: marca,
        ano: ano,
        cor: cor,
        preco: preco
    };

    veiculos.push(veiculo);
    alert('Veículo adicionado com sucesso!');
}

// READ
function listarVeiculos() {
    if (veiculos.length === 0) {
        alert('Nenhum veículo cadastrado.');
        return;
    }

    const veiculosOrdenados = veiculos.sort((a, b) => a.preco - b.preco);
    const listaVeiculos = veiculosOrdenados.map(veiculo => 
        `ID: ${veiculo.id} | Modelo: ${veiculo.modelo} | Marca: ${veiculo.marca} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$ ${veiculo.preco.toFixed(2)}`
    ).join('\n');

    alert(listaVeiculos);
}

// FILTER
function filtrarVeiculos() {
    const marcaFiltro = prompt('Informe a marca que deseja filtrar:').toLowerCase();
    const veiculosFiltrados = veiculos.filter(veiculo => veiculo.marca.toLowerCase() === marcaFiltro);

    if (veiculosFiltrados.length === 0) {
        alert('Nenhum veículo encontrado.');
        return;
    }

    // Pega o ID do primeiro veículo filtrado
    const idVeiculo = veiculosFiltrados[0].id;

    const listaVeiculosFiltrados = veiculosFiltrados.map(veiculo =>
        `ID: ${idVeiculo} | Modelo: ${veiculo.modelo} | Cor: ${veiculo.cor} | Preço: R$ ${veiculo.preco.toFixed(2)}`
    ).join('\n');

    alert(listaVeiculosFiltrados);
}

// UPDATE
function atualizarVeiculo() {
    const id = parseInt(prompt('Informe o ID do veículo que deseja atualizar:'), 10);
    const veiculo = veiculos.find(v => v.id === id);

    if (!veiculo) {
        alert('Veículo não encontrado. O usuário deve voltar para o menu inicial depois');
        return;
    }

    const novaCor = prompt('Informe a nova cor do veículo:', veiculo.cor);
    const novoPreco = parseFloat(prompt('Informe o novo preço do veículo:', veiculo.preco));

    if (!isNaN(novoPreco)) {
        veiculo.cor = novaCor;
        veiculo.preco = novoPreco;
        alert('Veículo atualizado com sucesso!');
    } else {
        alert('Preço inválido. A atualização falhou!');
    }
}

// DELETE
function removerVeiculo() {
    const id = parseInt(prompt('Informe o ID do veículo que deseja excluir:'), 10);
    const index = veiculos.findIndex(v => v.id === id);

    if (index === -1) {
        alert('Veículo não encontrado. O usuário deve voltar para o menu inicial depois');
    } else {
        veiculos.splice(index, 1);
        alert('Veículo excluído com sucesso!');
    }
}

// Acessando MENU
function menu() {
    let opcao;
    do {
        opcao = prompt(
            `Escolha uma opção:
            1. Criar veículo
            2. Listar veículos
            3. Filtrar veículos por marca
            4. Atualizar veículo
            5. Excluir veículo
            6. Sair`
        );

        switch (opcao) {
            case '1':
                criarVeiculo();
                break;
            case '2':
                listarVeiculos();
                break;
            case '3':
                filtrarVeiculos();
                break;
            case '4':
                atualizarVeiculo();
                break;
            case '5':
                removerVeiculo();
                break;
            case '6':
                alert('Saindo...');
                break;
            default:
                alert('Opção inválida. Tente novamente.');
        }
    } while (opcao !== '6');
}

menu();