/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/GameFieldWidget.js
class GameFieldWidget {
  constructor() {
    this.size = 16;
    this.field = null;
  }
  draw() {
    const field = document.querySelector(".field-container");
    let child = field.firstChild;
    while (child) {
      child.remove();
      child = field.firstChild;
    }
    for (let i = 0; i < this.size; i++) {
      const item = document.createElement("div");
      item.classList.add("field-item");
      field.append(item);
    }
    this.field = Array.from(document.querySelectorAll(".field-item"));
  }
  showGoblin(index) {
    const item = this.field[index];
    item.classList.add("goblin");
  }
  removeGoblin() {
    this.field.forEach(cell => cell.classList.remove("goblin"));
  }
}
;// CONCATENATED MODULE: ./src/js/GameControl.js
class GameControl {
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
    this.gameFieldWidget.field.forEach(cell => {
      cell.addEventListener("click", event => this.onCellClick(event));
    });
    this.intId = setInterval(() => {
      this.releaseGoblin();
    }, 700);
    const btn = document.querySelector(".ctrl-panel-btn");
    btn.addEventListener("click", event => this.onBtnClick(event));
  }
  releaseGoblin() {
    const index = Math.round(Math.random() * (this.gameFieldWidget.field.length - 1));
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
;// CONCATENATED MODULE: ./src/js/PanelWidget.js
class PanelWidget {
  constructor() {
    this.hit = 0;
    this.miss = 0;
  }
  showScore() {
    const score = document.querySelector(".ctrl-panel-score");
    score.textContent = ` 
        Попал - ${this.hit}
        Мимо - ${this.miss}`;
  }
  addHit() {
    this.hit += 1;
    this.showScore();
  }
  addMiss() {
    this.miss += 1;
    this.showScore();
  }
  clearScore() {
    this.hit = 0;
    this.miss = 0;
    this.showScore();
  }
  showResult(text) {
    const score = document.querySelector(".ctrl-panel-score");
    score.textContent = text;
    const btn = document.querySelector(".ctrl-panel-btn");
    btn.classList.remove("hidden");
  }
}
;// CONCATENATED MODULE: ./src/js/app.js




// TODO: write code here

const gameFieldWidget = new GameFieldWidget();
const panelWidget = new PanelWidget();
const gameControl = new GameControl(gameFieldWidget, panelWidget);
gameControl.startGame();
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;