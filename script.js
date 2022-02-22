const start = document.getElementById("start");
const gameContainer = document.querySelector("#jogo");

start.addEventListener("click", (e) => {
  const nivel = document.querySelector(".niveis input:checked").value;
  const [time, count] = chooseDificult(nivel);

  const game = new Game(time, count);
  game.start();
});

function chooseDificult(dificult) {
  switch (dificult) {
    case "facil":
      return [4000, 4];
    case "normal":
      return [3000, 5];
    case "dificil":
      return [2000, 6];
  }
}

class Alvo {
  constructor(count) {
    this.countAlvo = count;
    this.countAcerto = 0;
    this.onClick = this.onClick.bind(this);
  }
  created(x, y) {
    const element = document.createElement("div");
    element.className = "alvo";
    element.style.right = Math.floor(x);
    element.style.top = Math.floor(y);
    element.onclick = this.onClick;
    return element;
  }
  update() {
    const alvosContainer = document.getElementById("alvos");
    alvosContainer.innerHTML = "";
    const [width, height] = [window.innerWidth, window.innerHeight];
    for (let i = 0; i < this.countAlvo; i++) {
      const [x, y] = [Math.random() * width, Math.random() * height];
      const element = this.created(x, y);
      alvosContainer.appendChild(element);
    }
  }
  onClick({ target }) {
    target.remove();
    this.countAcerto++;
    document.getElementById("pont").innerHTML = this.countAcerto;
  }
}

class Game extends Alvo {
  constructor(time, count) {
    super(count);
    this.cronometroTime = 10;
    this.time = time;
    this.bestPlay = 0;
  }
  start() {
    this.update();
    document.querySelector(".dificuldade").style.display = "none";
    gameContainer.style.display = "block";
    this.running();
    this.cronometro();
    this.countAcerto = 0;
  }
  running() {
    this.timer = setInterval(() => {
      this.update();
    }, this.time);
  }
  gameOver() {
    clearInterval(this.timer);
    document.querySelector(".dificuldade").style.display = "flex";
    gameContainer.style.display = "none";
    console.log(this.bestPlay);
    let isBestPlay;
    if (this.countAcerto > this.bestPlay) {
      isBestPlay = this.countAcerto;
      this.bestPlay = this.countAcerto;
    }
    document.getElementById(
      "rank"
    ).innerHTML = `Sua melhor jogada foi ${isBestPlay}`;
    this.cronometroTime = 10;
  }

  cronometro() {
    const cronometroElement = document.getElementById("cronometro");
    const cronometro = setInterval(() => {
      cronometroElement.innerHTML = this.cronometroTime;
      this.cronometroTime--;
      if (this.cronometroTime === 0) {
        clearInterval(cronometro);
        this.gameOver();
      }
    }, 1000);
  }
}
