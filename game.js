let game = {

    iconsCartas : [
        'Abigail',
        'Sebastian',
        'abobora',
        'barra-iridio',
        'buque',
        'carambola',
        'cerveja',
        'fragmento',
        'galinha2',
        'pingente',
        'SenhorQi',
        'shirivia'
    ],


    cartas: null,

    travarJogo: false,

    primeiraCarta: null,
    segundaCarta: null,


    criarCarta: function (){
    
        this.cartas = []
    
        this.iconsCartas.forEach((iconCarta) =>{
            this.cartas.push(this.criarPar(iconCarta))
        })
    
        this.cartas = this.cartas.flatMap(pair => pair)
        this.embaralharCartas()
        return this.cartas     
    },


    criarId: function (iconCarta){

        return iconCarta + parseInt(Math.random() * 1000)
    
    },


    criarPar: function (iconCarta){
    
        return[{ id: this.criarId(iconCarta), icon: iconCarta, virada:false },
               { id: this.criarId(iconCarta), icon: iconCarta, virada:false }]
    
    },


    embaralharCartas: function (){

        let indexAtual = this.cartas.length
        let indexAleatorio = 0
    
        while (indexAtual !== 0){
    
            indexAleatorio = Math.floor(Math.random() * indexAtual)
            indexAtual--
    
            [this.cartas[indexAleatorio], this.cartas[indexAtual]] = [this.cartas[indexAtual], this.cartas[indexAleatorio]]
        }
    
    },
    

    checarCarta: function(id) {

        let carta = this.cartas.filter(carta=>carta.id===id)[0]

        if (carta.virada || this.travarJogo){
            return false
        }
            
        if (!this.primeiraCarta){
            this.primeiraCarta = carta
            this.primeiraCarta.virada = true
            return true
        } else{
            this.segundaCarta = carta
            this.segundaCarta.virada = true
            this.travarJogo = true
            return true
        }
        
    },


    checarSeDeuPar: function(){
        
        if(!this.primeiraCarta || !this.segundaCarta){
            return false}

        return this.primeiraCarta.icon === this.segundaCarta.icon

    },


    liberarJogo: function(){

        this.primeiraCarta = null
        this.segundaCarta = null
        this.travarJogo = false

    },


    desvirarCartas: function(){

        this.primeiraCarta.virada = false
        this.segundaCarta.virada = false
        this.liberarJogo()

    },


    fimDeJogo: function(){
        
        return this.cartas.filter(cartas=>!cartas.virada).length == 0

    }
    


}