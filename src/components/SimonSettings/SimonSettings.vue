<template>
  <div class="simon">
    <div class="simonRound">
      <h2>Количество раундов: {{ simon_count_round }}</h2>
      <button type="button" v-on:click="handleStartGame()">Начать</button>
      <div class="simonDifficulty">
        <h2>Настройка сложности:</h2>
        <span v-if="simon_difficulty == 0">Легкий</span>
        <span v-if="simon_difficulty == 1">Средний</span>
        <span v-if="simon_difficulty == 2">Сложный</span>
      </div>
      <div class="simonDifficultyButton">
        <button v-on:click="handleSimonDifficulty(0)">Легкий</button>
        <button v-on:click="handleSimonDifficulty(1)">Средний</button>
        <button v-on:click="handleSimonDifficulty(2)">Сложный</button>
      </div>
    </div>
    <div class="simonFieldGame">
      <div class="simonButtonWrapper" id="simonButtonWrapper">
        <button class="button1" id="1" v-on:click="handleSimonClickUser(1)">
          .
        </button>
        <button class="button2" id="2" v-on:click="handleSimonClickUser(2)">
          .
        </button>
        <br />
        <button class="button3" id="3" v-on:click="handleSimonClickUser(3)">
          .
        </button>
        <button class="button4" id="4" v-on:click="handleSimonClickUser(4)">
          .
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimonSettings",
  data() {
    return {
      simon_difficulty: 0,
      simon_difftime: 0,
      simon_steps: new Array(),
      simon_clicks: new Array(),
      simon_time_input: false,
      simon_count_round: 0,
    };
  },
  methods: {
    handelGetRandomNum: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    handleSleep: function (milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },
    handleGenerator: function (a) {
      for (let i = 0; i < a; i++) {
        let number = this.handelGetRandomNum(1, 4);
        this.simon_steps.push({ number });
        console.log("l: " + number);
      }
    },
    async handleStartGame() {
      this.simon_count_round = 1;
      await this.handleSleep(1000);
      this.handleNextStep();
      switch (this.simon_difficulty) {
        case 0:
          this.simon_difficulty = 1500;
          break;

        case 1:
          this.simon_difficulty = 1000;
          break;

        case 2:
          this.simon_difficulty = 400;
          break;
      }
    },
    handleSimonClickUser: function (id) {
      if (this.simon_time_input == true) {
        let number = id;
        this.simon_clicks.push({ number });

        let audio = new Audio(require("../../sounds/" + id + ".ogg"));
        audio.play();

        if (this.simon_clicks.length == 2 + this.simon_count_round) {
          const arraysAreEqual =
            JSON.stringify(this.simon_clicks) ==
            JSON.stringify(this.simon_steps);
          if (arraysAreEqual) {
            this.simon_count_round++;
            console.log("Верно");
            this.handleAccept();
            this.handleNextStep();
          } else {
            alert("Вы проиграли");
            this.simon_clicks = 0;
            this.simon_count_round = 0;
          }
        }
      }
    },
    async handleNextStep() {
      let a = 2 + this.simon_count_round;
      this.simon_time_input = false;

      this.simon_clicks = [];
      this.simon_steps = [];

      this.handleGenerator(a);

      for (let i = 0; i < this.simon_steps.length; i++) {
        await this.handleSleep(this.simon_difficulty);
        console.log(i);
        document.getElementById(this.simon_steps[i].number).click();
        document
          .getElementById(this.simon_steps[i].number)
          .classList.add("click");

        let audio = new Audio(
          require("../../sounds/" + this.simon_steps[i].number + ".ogg")
        );
        audio.play();

        await this.handleSleep(this.simon_difficulty);
        document
          .getElementById(this.simon_steps[i].number)
          .classList.remove("click");
      }
      this.simon_time_input = true;
    },
    handleSimonDifficulty: function (dif) {
      this.simon_difficulty = dif;
      this.simon_count_round = 0;
    },
    async handleAccept() {
      document.getElementById("simonButtonWrapper").classList.add("accept");
      await this.handleSleep(1000);
      document.getElementById("simonButtonWrapper").classList.remove("accept");
    },
  },
};
</script>

<style scoped>
.simon {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.simonRound {
  display: flex;
  flex-direction: column;
}
.simonRound > button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: #4e4e4e;
  color: white;
  font-size: 18px;
  cursor: pointer;
}
.simonRound > button:hover {
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 2px 14px 2px rgba(0, 0, 0, 0.3);
}
.simonDifficulty {
  padding-bottom: 10px;
}
.simonDifficulty > span {
  font-size: 20px;
}
.simonDifficultyButton {
  display: flex;
  gap: 10px;
}
.simonDifficultyButton > button {
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  background-color: #4e4e4e;
  color: white;
  font-size: 18px;
  cursor: pointer;
}
.simonDifficultyButton > button:hover {
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 2px 14px 2px rgba(0, 0, 0, 0.3);
}
.simonFieldGame {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap-reverse;
}

.simonButtonWrapper {
  overflow: hidden;
  border-radius: 100%;
  box-shadow: 2px 1px 12px #aaa;
  width: 300px;
  height: 300px;
}
.simonButtonWrapper > button {
  height: 150px;
  width: 150px;
  border: 0;
  transition: 0.1s;
}
.simonButtonWrapper > button:hover {
  border: 3px solid white;
}
.button1 {
  border: none;
  background: dodgerblue;
  color: dodgerblue;
  border-radius: 100% 0 0 0;
  cursor: pointer;
}
.button2 {
  border: none;
  background: #ff5643;
  color: #ff5643;
  border-radius: 0 100% 0 0;
  cursor: pointer;
}
.button3 {
  border: none;
  background: #feef33;
  color: #feef33;
  border-radius: 0 0 0 100%;
  cursor: pointer;
}
.button4 {
  border: none;
  background: #bede15;
  color: #bede15;
  border-radius: 0 0 100% 0;
  cursor: pointer;
}
.accept {
  border: 6px solid lightgreen;
  transition: 0.3s;
}
.click {
  opacity: 20%;
}
</style>
