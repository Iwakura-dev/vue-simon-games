<template>
  <div id="app">
    <h1>Simon Says</h1>
    <div class="">
      <simon-games />
    </div>
  </div>
</template>

<script>
import SimonGames from "./components/SimonGames.vue";
export default {
  name: "App",
  components: {
    SimonGames,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: border-box;
  padding: 0;
}
</style>
