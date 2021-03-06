function Jogo(dados = 5, lados = 6) {
    console.log('model: executar constructor de jogo');
    this.dados = dados;
    this.lados = lados;
    this.pontos = 0;
    this.n = 0;
}

Jogo.prototype.novoJogo = function() {
    console.log('model: novoJogo')
    this.pontos = 0;
    this.n = 0;
}

Jogo.prototype.lancarUmDado = function(lados){
    var valorAleatorio = Math.random(); // No intervalo [0,1)
    // [0,1) * 6 = [0,6)
    // Aplicando floor = [0,1,2,3,4,5]
    // Somando 1 = [1,2,3,4,5,6]
    var numero = 1 + Math.floor(valorAleatorio * lados ); // No intervalo [1,6]
    return numero;
}

Jogo.prototype.lancarDados = function(){
    console.log('model: lancarDados')
    var lancamento = [];
    for (var i=0; i < this.dados; i++){
        lancamento[i] = this.lancarUmDado(this.lados);
    }
    return lancamento;
}

Jogo.prototype.contarDados = function(lancamento){
    var contagem = Array(this.lados).fill(0);   
    for (var i = 0; i < lancamento.length; i ++){
        var numero = lancamento[i];     
        contagem[numero] += 1;
    }   
    return contagem;
}

const GENERALA = { jogo : 'Generala', pontos : 100 }
const POKER    = { jogo : 'Poker'   , pontos : 50  }
const FULL     = { jogo : 'Full'    , pontos : 30  }
const NADA     = { jogo : 'Nenhum'  , pontos : 0   }

Jogo.prototype.analisarLancamento = function(lancamento){
    var contagem = this.contarDados(lancamento);

    var resultado;

    if ( contagem.find(e => e === 5) )
        resultado = GENERALA;
    else if ( contagem.find(e => e === 4) )
        resultado = POKER;
    else if ( contagem.find(e => e === 3) && contagem.find(e => e === 2) )
        resultado = FULL;
    else
        resultado = NADA;

    return resultado;
}

Jogo.prototype.novoLancamento = function() {
    console.log("model: novoLancamento");
    var lancamento = this.lancarDados();
    console.log("model: analiseLancamento");
    var analiseLancamento = this.analisarLancamento(lancamento);
    this.pontos += analiseLancamento.pontos;
    this.n += 1;    
    console.log("model: prepara o resultado");
    var resultado = {
        pontosAcumulados : this.pontos,
        nLancamentos : this.n,      
        lancamento : lancamento,
        jogoLancamento : analiseLancamento.jogo,
        pontosLancamento : analiseLancamento.pontos
    }    
    return resultado
};

function testarLancamento(){
    console.log('--- test model jogo: lançar dados e analisar lançamento');
    
    var jogo = new Jogo();
    var lancamento;
    
    for (var i=0; i < 5; i++){
        lancamento = jogo.lancarDados();
        console.log('model: lancamento ',i, lancamento);
        console.log('model: análise do lançamento ', jogo.analisarLancamento(lancamento) );
        }

    console.log('--- end test model jogo');
}

testarLancamento()


module.exports.Jogo = Jogo;