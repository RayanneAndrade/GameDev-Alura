class BotaoGerenciador {
  constructor(texto, posX, posY) {
    this.texto = texto;
    this.posX = posX;
    this.posY = posY;
    this.botao = createButton(this.texto);
    this.botao.mousePressed(() => this._alteraCena());
    this.botao.addClass("botao-tela-inicial");
  }

  draw() {
    this.botao.position(this.posX, this.posY);
    this.botao.center('horizontal');
    
  }
  
  _alteraCena() {
    this.botao.remove();
    somEntrada.stop();
    trilhaSonora.loop();
    cenaAtual='jogo';
  }
}