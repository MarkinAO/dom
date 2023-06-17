export default class GameControl {
  constructor(gameFieldWidget, panelWidget) {
    this.gameFieldWidget = gameFieldWidget;
    this.panelWidget = panelWidget;
    this.intId = null;
    this.accessField = true;
  }

  startGame() {
    this.gameFieldWidget.draw();
    this.panelWidget.showScore();
    this.accessField = true;

    this.gameFieldWidget.field.forEach((cell) => {
      cell.addEventListener("click", (event) => this.onCellClick(event));
    });

    this.intId = setInterval(() => {
      this.releaseGoblin();
    }, 700);

    const btn = document.querySelector(".ctrl-panel-btn");
    btn.addEventListener("click", (event) => this.onBtnClick(event));
  }

  releaseGoblin() {
    const index = Math.round(
      Math.random() * (this.gameFieldWidget.field.length - 1)
    );
    this.gameFieldWidget.removeGoblin();
    this.gameFieldWidget.showGoblin(index);
  }

  onCellClick(event) {
    event.preventDefault();
    if (!this.accessField) return;
    const field = this.gameFieldWidget.field;
    const index = field.indexOf(event.currentTarget);

    if (field[index].classList.contains("goblin")) {
      this.panelWidget.addHit();
    } else {
      this.panelWidget.addMiss();
    }
    this.checkScore();
  }

  checkScore() {
    if (this.panelWidget.hit === 10) {
      this.panelWidget.showResult("Победа!!!");
      clearInterval(this.intId);
      this.accessField = false;
    }
    if (this.panelWidget.miss === 5) {
      this.panelWidget.showResult("Ты проиграл!");
      clearInterval(this.intId);
      this.accessField = false;
    }
  }

  onBtnClick(event) {
    event.preventDefault();
    this.startGame();
    const btn = document.querySelector(".ctrl-panel-btn");
    this.panelWidget.clearScore();
    btn.classList.add("hidden");
  }
}
