class TelaInicial {
  constructor(){
    somEntrada.play();
  }
  
  draw(){
    this._imagemDeFundo();
    this._texto();
    this._botao();
  }
  
  _imagemDeFundo(){
    image(imagemTelaInicial,0,0, width, height);
  }
  
  _texto(){
    textAlign(CENTER,CENTER);
    textSize(70);
    textFont(fontPrincipal);
    stroke(color("#FFF"));
    strokeWeight(6);
    fill(color('#740093'));
    text('As aventuras de',width/2,(height/5)*1.5);
    textSize(80);
    textAlign(CENTER,CENTER);
    text('HIPSTA',width/2,(height/5)*1.5+60);
    
    strokeWeight(3);
    image(controles, width/2-50,(height/11)*7.8, 100, 75);
    fill(color('#000'));
    textAlign(CENTER,CENTER);
    textSize(20);
    let aChar = "CONTROLES:\n ARROW UP TO JUMP\n ARROW UP (2x) DOUBLE JUMP \n  ARROW LEFT TO WALK LEFT\n ARROW RIGHT TO WALK RIGHT";
    let cWidth = textWidth(aChar);
    text(aChar,width/2,(height/9)*8);
    
    
  }
  
  _botao(){
    botaoGerenciador.posY = height/7*4;
    botaoGerenciador.draw();
  }
}