//cronometro
var centesimas = 0;
var segundos = 0;
var himno = new Audio('sonidos/ricky.ogg');
var contador = 0;

function inicio() {
    if (segundos == 0 && contador==0) {
        control = setInterval(cronometro, 10);
        himno.play();
        himno.volume=0.25;
    }
    if(segundos==0 && contador==1){
        control = setInterval(cronometro, 10);
    }
    if(segundos==0 && contador==2){
        control = setInterval(cronometro, 10);
    }
}
function parar() {
  clearInterval(control);
}
function reinicio() {
  clearInterval(control);
  contador++;
  centesimas = 0;
  segundos = 0;
  if (contador==1) {
    
  }
  else{
    Centesimas.innerHTML = "00";
    Segundos.innerHTML = "00";
  }
  
}
function cronometro() {
  if(segundos==30 && contador==2){
    parar();
    document.getElementById('VIDEO').style.display = "none";
    document.getElementById('texto').style.backgroundColor = "black";
    document.getElementById('texto').style.color= "black";
    document.getElementById('texto').innerHTML="Gracias por 'JUGAR'";
    document.getElementById('texto').style.display = "none";
    document.getElementById('meme1').style.backgroundImage= "url('images/FORT/fin.jpg')";
    document.getElementById('meme1').style.width="1024px";
    document.getElementById('meme1').style.height="800px";
    document.getElementById('meme1').style.backgroundPosition="center";
    document.getElementById('meme1').style.margin="auto";
    document.getElementById('meme1').style.backgroundSize="contain";
    document.getElementById('body').style.backgroundImage="none";
    document.getElementById('body').style.backgroundColor="#FF9800";
  }
  if (segundos == 120 && centesimas == 00 && contador==0) {
    himno.volume=0.10;
    var audio = new Audio ('sonidos/stop.mp3');
    audio.play();
    audio.volume=0.25;
  }
  if (segundos < 999999 && contador==0) {
    if (juego.checkGanador()==true && contador==0) {
      parar();
      juego.buscarPosicion();
      himno.pause();
      document.getElementById('texto').innerHTML="El Comandante nos abandono :("; 
      reinicio();
      inicio();
    }
  }
  if (segundos==10 && contador==1) {
        document.getElementById('body').style.backgroundImage="url('images/FORT/fondo2.jpg')";
        document.getElementById('body').style.backgroundSize="cover";
        document.getElementById('meme1').style.backgroundRepeat="no-repeat";
        document.getElementById('izquierda').style.display = "none";
        document.getElementById('conts').style.display = "none";
        document.getElementById('Juego').style.display = "none";
        document.getElementById('fondoASD').style.display = "none";
        document.getElementById('contenedor').style.display = "none";
        document.getElementById('fondoASDF').style.display = "none";
        document.getElementById('texto').innerHTML="Estará siempre presente en nuestros corazones"; 
        var video = document.getElementById("VIDEO");
        video.setAttribute("src","videos/looz.mp4");
        video.setAttribute("width", "1024");
        video.setAttribute("height", "600");
        document.body.appendChild(video);
        video.play();
        video.volume=0.25;
        reinicio();
        inicio();
      }
  if (centesimas < 99) {
    centesimas++;
    if (centesimas < 10 ) { centesimas = "0"+centesimas }
    if (contador!=1) {
      Centesimas.innerHTML = centesimas;
    }
    
  }
  if (centesimas == 99) {
    centesimas = -1;
  }
  if (centesimas == 0 ) {
    segundos ++;
    if (segundos < 10 ) { segundos = "0"+segundos }
    if (contador!=1) {
      Segundos.innerHTML = segundos;
    }
    
  }
}

//Juego
var juego = {
  pos:[[],[]],
  filas:[[],[],[]],
  espacioVacio: {
    fila:2,
    columna:2
  },
  iniciar:function(elemento){
    this.instalarPiezas(elemento);
    this.mezclarFichas(100);
    this.capturarTeclas(elemento);
  },
  instalarPiezas:function(juegoEl,fila,ccolumna){
    var counter = 1;

    for (var f = 0; f < 3; f++) {
      for (var c = 0; c < 3; c++) {

        if(f == this.espacioVacio.f && c == this.espacioVacio.c) {
          this.filas[f][c] = null;
        }else{
          var pieza = this.crearPieza(counter++,f,c);
          juegoEl.append(pieza.el);
          this.filas[f][c] = pieza;              
        }
      }
    }
    return juegoEl;
  },
  crearPieza(numero,fila,columna){
    
    if (numero<9) {
      var nuevoElemento = $('<div>');
      nuevoElemento.addClass('pieza');

      nuevoElemento.css({
        backgroundImage:'url(images/FORT/' + numero + '.jpeg)',
        top: fila * 200,
        left: columna * 200,
      });
    

    }
  return {
      el:nuevoElemento,
      numero:numero,
      filaInicial:fila,
      columnaInicial:columna,
    };
  },  
  buscarPosicion:function () {
    for (var f = 0; f < 3; f++) {
      for (var c = 0; c < 3; c++) {
        if (this.filas[f][c]==null) {
          var elemento = $('#Juego');
          var fil=f;
          var col=c;
          this.instalarUltimaPieza(elemento,fil,col);
        }
      }
    }
  },
  instalarUltimaPieza:function(elemento,fil,col){
    var numero=9;
    var pieza = this.crearUltimaPieza(numero,fil,col);
    elemento.append(pieza.el);
    this.filas[fil][col] = pieza;
  },
  crearUltimaPieza(numero,f,c){
    var nuevoElemento = $('<div>');
    nuevoElemento.addClass('pieza');

    nuevoElemento.css({
      backgroundImage:'url(images/FORT/' + numero + '.jpeg)',
      top: f * 200,
      left: c * 200,
      
    });
    return {
      el:nuevoElemento,
      numero:numero,
      filaInicial:f,
      columnaInicial:c,
    };
  },
  checkGanador(){
    for (var f = 0; f < this.filas.length; f++) {
      for (var c = 0; c < this.filas.length; c++) {
        var ficha = this.filas[f][c];
        if(ficha && !(ficha.filaInicial == f && ficha.columnaInicial == c)){
          return false;
        }
      }
    }
    return true;
  },
  perdiste(){
    parar(); 
    alert('Breaking news:"Donald Trump is not the new President of America, no one knows who is the new president" God bless you and keep you. Thanks for your help.');
  },
  capturarTeclas(){
    var that = this;
    var cont=0;
    var mov=0;
    $(document).keydown(function(evento) {
        switch(evento.which) {
            case 37:
              if (segundos == 0 && cont==0) {
                inicio();
                cont++;
              }
              that.moverHaciaLaIzquierda();
              mov++;
              document.getElementById('movement').innerHTML="Movimietos: "+mov;
            break;

            case 38:
              that.moverHaciaArriba();
              if (segundos == 0 && cont==0) {
                inicio();
                cont++;
              }
              mov++;
              document.getElementById('movement').innerHTML="Movimietos: "+mov;
            break;

            case 39:
              that.moverHaciaLaDerecha();
              if (segundos == 0  && cont==0) {
                inicio();
                cont++;
              }
              mov++;
              document.getElementById('movement').innerHTML="Movimietos: "+mov;
            break;

            case 40:
              that.moverHaciaAbajo();
              if (segundos == 0  && cont==0) {
                inicio();
                cont++;
              }
              mov++;
              document.getElementById('movement').innerHTML="Movimietos: "+mov;
            break;

            default: return;
        }
      evento.preventDefault();
    })
  },
  moverHaciaAbajo(){
    var filaInicio=this.espacioVacio.fila-1;
    var columnaInicio=this.espacioVacio.columna;

    this.intercambiarPosicionConEspacioVacio(filaInicio,columnaInicio);
  },
  moverHaciaArriba(){
    var filaInicio=this.espacioVacio.fila+1;
    var columnaInicio=this.espacioVacio.columna;

    this.intercambiarPosicionConEspacioVacio(filaInicio,columnaInicio);
  },
  moverHaciaLaDerecha(){
    var filaInicio=this.espacioVacio.fila;
    var columnaInicio=this.espacioVacio.columna-1;

    this.intercambiarPosicionConEspacioVacio(filaInicio,columnaInicio);
  },
  moverHaciaLaIzquierda(){
    var filaInicio=this.espacioVacio.fila;
    var columnaInicio=this.espacioVacio.columna+1;

    this.intercambiarPosicionConEspacioVacio(filaInicio,columnaInicio);
  },
  intercambiarPosicionConEspacioVacio(fila, columna){
    var ficha = this.filas[fila] && this.filas[fila][columna];
    if(ficha){
      this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
      this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
      this.guardarEspacioVacio(fila,columna);
    }
  },
  guardarEspacioVacio(fila,columna){
    this.espacioVacio.fila = fila;
    this.espacioVacio.columna = columna;

    this.filas[fila][columna] = null;
  },
  moverFichaFilaColumna(ficha,fila,columna){
    ficha.el.css({
      top: fila * 200,
      left: columna * 200
    })
  },
  mezclarFichas(veces){
    if(veces<=0){return;}

    var that = this;
    var funciones = ['moverHaciaAbajo','moverHaciaArriba','moverHaciaLaIzquierda','moverHaciaLaDerecha'];
    var numeroRandom = Math.floor(Math.random() * 4);
    var nombreDeFuncion = funciones[numeroRandom];
    this[nombreDeFuncion]();

    setTimeout(function(){
      that.mezclarFichas(veces-1);
    },10);
  }
}

$(function(){
  var elemento = $('#Juego');
  juego.iniciar(elemento);

})