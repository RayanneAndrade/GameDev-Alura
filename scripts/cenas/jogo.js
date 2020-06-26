class Jogo {
  constructor() {
    this.indice = 0;
    this.mapa = fita.mapa;
    this.dificuldade = fita.dificuldade[0];
    this.cfgVida = fita.configuracao;
  }

  setup() {
    cenario1 = new Cenario(imagemCenario1, 5);
    cenario2 = new Cenario(imagemCenario2, 5);
    cenario3 = new Cenario(imagemCenario3, 2);
    cenario4 = new Cenario(imagemCenario4, 2);
    cenario5 = new Cenario(imagemCenario5, 5);
    cenario6 = new Cenario(imagemCenario6, 7);
    cenario7 = new Cenario(imagemCenario7, 7);

    cenarios.push(cenario1, cenario2, cenario3, cenario4, cenario5, cenario6, cenario7);

    splashGame = new Splash(imagemSplash);

    personagem = new Personagem(imagemPersonagem, 0, 72, 132, 162, 220, 270);
    const inimigo = new Inimigo(imagemInimigo, width - 52, 72, 70, 67, 105, 100, 10);
    const inimigoTroll = new Inimigo(imagemInimigoTroll, width + 300, 30, 250, 250, 400, 400, 10);
    const inimigoVoador = new Inimigo(imagemInimigoVoador, width + 300, 300, 120, 90, 200, 150, 10);


    npc1 = new Npc(imagemNpc, width - 401, -100, 28, 25.33, 28, 25.33);
    npc2 = new Npc(imagemNpc, width - 208, -200, 28, 25.33, 28, 25.33);
    npc3 = new Npc(imagemNpc, width - 108, -350, 28, 25.33, 28, 25.33);
    npc4 = new Npc(imagemNpc, width - 302, -100, 28, 25.33, 28, 25.33);

    npcs.push(npc1, npc2, npc3, npc4);

    crystal = new Crystal(imagemCristal, width - 28, -300, 33, 70, 17.37, 29.33);

    inimigos.push(inimigo, inimigoTroll, inimigoVoador);

    pontuacao = new Pontuacao();
    vida = new Vida(this.cfgVida.vidaMaxima,this.cfgVida.vidaInicial);
    
  }

  draw() {
    cenarios.map(function(cenario) {
      cenario.exibe();
      cenario.move();
    });
    
    npcs.map(function(npc) {
      npc.exibe();
      npc.move();
    });
    
    vida.draw();
    
    
    if (keyIsDown(LEFT_ARROW))
      personagem.anda(0);
    if (keyIsDown(RIGHT_ARROW))
      personagem.anda(1);

    personagem.exibe();
    personagem.aplicaGravidade();

    crystal.exibe();
    crystal.move();

    pontuacao.exibe();
    pontuacao.adicionarPonto();

    if (personagem.estaColidindo(crystal)) {
      pontuacao.adicionarCristal();
      
      if (pontuacao.cristaisVida == this.cfgVida.limiteCristais){
        pontuacao.cristaisVida = 0;
        somGanhaVida.play();
        vida.ganhaVida();
      }
      
      crystal.remove();
      gc.play();
    }

    if (inimTela == false) this.inimigoAtual = getNumber(this.inimigoAtual, inimigos.length);

    //console.log('inimigos.length: ' + inimigos.length);
    //console.log(this.inimigoAtual);
    //console.log(this.dificuldade);
    //console.log(this.dificuldade.velocidadeMob);
    
    inimigos[this.inimigoAtual].velocidade = (10 + Math.floor((20 - 10) * Math.random())) * this.dificuldade.velocidadeMob;
    inimigos[this.inimigoAtual].exibe();
    inimigos[this.inimigoAtual].move()

    if (personagem.estaColidindo(inimigos[this.inimigoAtual])) {
      
      if (inimigos[this.inimigoAtual].jaColidiu === false) {
        vida.perdeVida();
        somPerdeVida.play();
        inimigos[this.inimigoAtual].jaColidiu = true;
      }

      if (vida.vidaAtual <= 0) {
        GameOver();
      }
    }

    inimTela = true;

    if (inimigos[this.inimigoAtual].isShow == false) {
      inimigos[this.inimigoAtual].isShow = true;
      inimTela = false;
    }
  }

  keyPressed(key) {
    if (key === 'ArrowUp') {
      personagem.pula(somDoPulo);
    }
    if (key === 'Enter') {
      if (stage === 1) {
        window.location.reload();
      } else {
        stage = 1;
      }
    }
  }
}