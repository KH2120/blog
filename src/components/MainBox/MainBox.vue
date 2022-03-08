<template>
  <div>
    <div id="box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainBox",
};
</script>

<style scoped>
#box {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  background-color: rgb(177, 177, 177);
}
</style>