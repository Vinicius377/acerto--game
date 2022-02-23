const start = document.getElementById("start") as HTMLButtonElement;

start.addEventListener("click", (e) => {
  const nivel = document.querySelector(
    ".niveis input:checked"
  ) as HTMLInputElement;
  const [time, count] = chooseDificult(nivel.value);

  const game = new Game(time, count);
  game.start();
});

function chooseDificult(dificult: string) {
  switch (dificult) {
    case "facil":
      return [4000, 4];
    case "normal":
      return [3000, 5];
    case "dificil":
      return [2000, 6];
    default:
      return [0, 0];
  }
}
// Telas do jogo
const telas = {
  containerDific: document.querySelector(".dificuldade") as HTMLDivElement,
  gameContainer: document.querySelector("#jogo") as HTMLDivElement,
};

/**
 *
 */
class Alvo {
  private countAlvo: number;
  protected countAcerto: number;
  constructor(count: number) {
    this.countAlvo = count;
    this.countAcerto = 0;
    this.onClick = this.onClick.bind(this);
  }
  private created(x: number, y: number) {
    const element = document.createElement("div");
    element.className = "alvo";
    element.style.right = `${Math.floor(x) - 80}px`;
    element.style.top = `${Math.floor(y) - 80}px`;
    element.onclick = this.onClick;
    return element;
  }
  protected update() {
    const alvosContainer = document.getElementById("alvos") as HTMLDivElement;
    alvosContainer.innerHTML = "";
    const [width, height] = [window.innerWidth, window.innerHeight];
    for (let i = 0; i < this.countAlvo; i++) {
      const [x, y] = [Math.random() * width, Math.random() * height];
      const element = this.created(x, y);
      alvosContainer.appendChild(element);
    }
  }
  onClick({ target }: any) {
    target.remove();
    this.countAcerto++;
    const pontuação = document.getElementById("pont") as HTMLSpanElement;
    pontuação.innerHTML = "" + this.countAcerto;
  }
}
/**
 *
 */

class Game extends Alvo {
  private cronometroTime: number;
  private time: number;
  private bestPlay: number;
  private timer: any;
  constructor(time: number, count: number) {
    super(count);
    this.cronometroTime = 60;
    this.time = time;
    this.bestPlay = 0;
  }
  start() {
    this.update();
    telas.containerDific.style.display = "none";
    telas.gameContainer.style.display = "block";
    this.running();
    this.cronometro();
    this.countAcerto = 0;
  }
  private running() {
    this.timer = setInterval(() => {
      this.update();
    }, this.time);
  }
  private gameOver() {
    clearInterval(this.timer);
    telas.containerDific.style.display = "flex";
    telas.gameContainer.style.display = "none";
    let isBestPlay;
    if (this.countAcerto > this.bestPlay) {
      isBestPlay = this.countAcerto;
      this.bestPlay = this.countAcerto;
    }
    const rank = document.getElementById("rank") as HTMLSpanElement;
    rank.innerHTML = `Sua melhor jogada foi ${isBestPlay}`;
    this.cronometroTime = 60;
  }

  private cronometro() {
    const cronometroElement = document.getElementById(
      "cronometro"
    ) as HTMLSpanElement;
    const cronometro = setInterval(() => {
      cronometroElement.innerHTML = "" + this.cronometroTime;
      this.cronometroTime--;
      if (this.cronometroTime === 0) {
        clearInterval(cronometro);
        this.gameOver();
      }
    }, 1000);
  }
}
const mira = document.querySelector("#mira") as HTMLImageElement;
mira.removeEventListener;
window.addEventListener("mousemove", (e) => {
  mira.style.left = `${e.clientX - 24}px`;
  mira.style.top = `${e.clientY - 22}px`;
});
