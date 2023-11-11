const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath:
    process.env.NODE_ENV === "production" ? "/vue-test-task-simon-games/" : "/",
  transpileDependencies: true,
});
