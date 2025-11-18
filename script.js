const board = document.getElementById('board')
const statusText = document.getElementById('status')
// getElementById serve para vc buscar um elemnto mcom ID x no html, no caso board e status

let jogoAtivo = true
let jogadorAtual = 'X'
let celulas = Array(9).fill(null)

function reiniciarJogo() {
    // Função de iniciar jogo.
    jogoAtivo = true
    jogadorAtual = 'X'
    celulas = Array(9).fill(null)
    // o fill serve para preemncher uma estrutura de dados ou elemento grafico com um valor, no caso null
    // console.log(statusText);
    statusText.textContent = `turno do jogador X`
    // console.log(statusText);
    criarTabuleiro()
}

function criarTabuleiro() {
    board.innerHTML = ``
    // o innerHTML permite com que ele leia o html e coloque aqui dentro.
    celulas.forEach((celula, index) => {
        // o forEach aqui ele esta criando um array chamado celula e dando um ID unico para ele
        const div = document.createElement('div');
        // createElement neste caso está criando uma div diretamente no codigo html
        div.classList.add('cell');
        // o add está criando uma class cell para sofrer as mudanças do css
        div.dataset.index = index;
        // o dataset permite que a gnt modifique o html pelo js
        div.addEventListener('click', clickCelula)
        // aqui em cima o addEventListener está citando que caso ocorra um clique execute o função click
        if (celula) {
            div.textContent = celula
            div.classList.add(celula)
            // aqui o add está criando uma celula dentro da div.
            div.classList.add(celula.toLowerCase())
            // o toLowerCase está deixando todos os caracteres minusculos dentro da celula
        }
        board.appendChild(div);
        // aqui ele está criando uma div para ser elemento filho do board
        // para que mais para frente nesta div crie celulas para o jogo da velha
    });
}

function clickCelula(e) {
    const index = e.target.dataset.index
    // console.log(e)
    // console.log(index)

    if (celulas[index] || !jogoAtivo) {
        return
    }

    celulas[index] = jogadorAtual
    criarTabuleiro()
    if (verificarVitoria()) {
        // vitoria
        statusText.textContent = `O jogador ${jogadorAtual} venceu!`
        jogoAtivo = false
    } else if (!celulas.includes(null)) {
        // includes serve para verificar se uma variavel é true ou false
        // empate
        jogoAtivo = false
        statusText.textContent = `O jogo empatou!`
    } else {
        // aqui embaixo está um if contatenado, ele faz a mesma coisa que um if normal mas ele fica numa linha só para confirmar a condição
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'
        statusText.textContent = `turno do jogador ${jogadorAtual}`
        // aqui o statusText está sendo chamado para que o conteudo dentre dele se torne "turno do jogador tal"
        // já o cifrão está sendo usado para indicar que o esta dentro das chaves é uma variavel
    }
}

function verificarVitoria() {
    const combinacoes = [
        // horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // vertical
        [2, 5, 8],
        [0, 3, 6],
        [1, 4, 7],
        // diagonal
        [0, 4, 8],
        [2, 4, 6],
    ]
    // console.log(celulas)
    for (let i = 0; i < combinacoes.length; i++) {
        const [a, b, c] = combinacoes[i]
        // console.log(a, b, c)
        const valorA = celulas[a]
        const valorB = celulas[b]
        const valorC = celulas[c]
        // console.log(valorA, valorB, valorC)
        if (valorA && valorA === valorB && valorA === valorC) {
            // aqui ele conclui se alguem ganhou se for veridico
            console.log('Vitoria!')
            return true
        }
        // console.log(combinacoes[i])
        // for(let j = 0; j < combinacoes[i].length; j++){
        // console.log(combinacoes[i][j])
        //}
    }
    return false
    // quando ele retorna false significa que deu empate
}
// Precisamos retornar combinações pela jogadas;

reiniciarJogo()