function iniciar(){
    document.querySelector("#comecoDeJogo").style.display = "none"
    document.querySelector("#tabuleiro").style.display = "grid"
}

function restart(){
    game.liberarJogo()
    comecarJogo()
    document.querySelector("#fimDeJogo").style.display = "none"
    document.querySelector("#tabuleiro").style.display = "grid"
}





const FRENTE = "parteDaFrente"

const COSTAS = "parteDeTras"

const CARTA = "carta"

const IMAGEM = "imagem"

const VIRAR = "virar"



comecarJogo() 


function comecarJogo(){
    
     montarCartas(game.criarCarta())

}


function criarConteudoDaCarta(carta, divCarta){

    criarImagemDaCarta(FRENTE, carta, divCarta)
    criarImagemDaCarta(COSTAS, carta, divCarta)

}



function criarImagemDaCarta(frente, carta, elemento){

    let imagemDaCarta = document.createElement('div')
    imagemDaCarta.classList.add(frente)

    if(frente === FRENTE){
        let imagem = document.createElement('img')
        imagem.classList.add(IMAGEM)
        imagem.src = "./img/" + carta.icon + ".png"
        imagemDaCarta.appendChild(imagem)
    } else{
        imagemDaCarta.innerHTML = "<div><img src='./img/galinha.png'></div>"
    }

      elemento.appendChild(imagemDaCarta)

}



function montarCartas(cartas){
    
    let tabuleiro = document.querySelector("#tabuleiro")
    tabuleiro.innerHTML = " "
    
    game.cartas.forEach(carta=>{

        let divCarta = document.createElement('div')
        divCarta.id = carta.id
        divCarta.classList.add(CARTA)
        divCarta.dataset.icon = carta.icon

        criarConteudoDaCarta(carta, divCarta)

        divCarta.addEventListener('click', virarCarta)
        tabuleiro.appendChild(divCarta)

    })

}



function virarCarta(){

    if (game.checarCarta(this.id)){ 
        this.classList.add(VIRAR)
        if (game.segundaCarta){
        if (game.checarSeDeuPar()){
            game.liberarJogo()

            if (game.fimDeJogo()){

                document.querySelector("#fimDeJogo").style.display = "flex"
                document.querySelector("#tabuleiro").style.display = "none"

            }

        } else{

            setTimeout(()=>{
            let PRIMEIRACARTA = document.getElementById(game.primeiraCarta.id)
            let SEGUNDACARTA = document.getElementById(game.segundaCarta.id)

            PRIMEIRACARTA.classList.remove(VIRAR)
            SEGUNDACARTA.classList.remove(VIRAR)
            game.desvirarCartas()
            }, 780)

        }
    }}

}
 





