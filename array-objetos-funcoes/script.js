const data = [
  {
    nome: "Roger Medeiros",
    sexo: "M",
    salario: 3250,
  },
  {
    nome: "Carolina Silva",
    sexo: "F",
    salario: 1200,
  },
  {
    nome: "Cristina Avila",
    sexo: "F",
    salario: 8100,
  },
  {
    nome: "Gustavo Hoffman",
    sexo: "M",
    salario: 5200.35,
  },
  {
    nome: "Eva Trindade",
    sexo: "F",
    salario: 2501,
  },
  {
    nome: "Andre Mathias",
    sexo: "M",
    salario: 1750,
  },
  {
    nome: "Joice Castro da Silva",

    sexo: "F",
    salario: 3350.25,
  },
];

// 1

console.log('Total de pessoas: ', data.length)

// 2

const pessoasFeminino = data.filter(data => data.sexo === 'F').length
console.log('Total de pessoas do sexo feminino: ', pessoasFeminino)

// 3

let somaSalarios = 0

for (let i = 0; i < data.length; i++) {
    somaSalarios += data[i].salario
}
console.log('A soma do salários de todas as pessoas é:' + ' R$', somaSalarios.toFixed(2))

// 4

const mediaSalarios = somaSalarios / data.length
console.log('A média de salário de todas as pessoas é:' + ' R$', mediaSalarios.toFixed(2))

// 5

let somaSalariosMasculino = 0
data.forEach(data => {
    if (data.sexo === 'M') {
        somaSalariosMasculino += data.salario
    }
}) 
console.log('A soma do salário de todas as pessoas do sexo masculino é:' + ' R$', somaSalariosMasculino.toFixed(2))

// 6

const pessoasMasculino = data.filter(data => data.sexo === 'M').length
const mediaSalarioMasculino = somaSalariosMasculino / pessoasMasculino
console.log('A média do salário de todas as pessoas do sexo masculino é:' + ' R$', mediaSalarioMasculino.toFixed(2))

// 7

const salarioMaiorQue = data.some(data => data.salario > 7000)
console.log('Tem algum salário superior à R$ 7.000?', salarioMaiorQue)

// 8

const indiceEva = data.findIndex(data => data.nome === 'Eva Trindade')
console.log('Posição da pessoa Eva Trindade: ', indiceEva)

// 9

const sobrenomeSilva = data.filter(data => {
    const sobrenome = data.nome.split(' ')
    return sobrenome.indexOf('Silva') !== -1
})

console.log('Pessoas com o sobrenome Silva: ', sobrenomeSilva)

// 10

const nomes = data.map(data => data.nome)
console.log('Nomes das pessoas: ', nomes)