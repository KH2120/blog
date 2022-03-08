<template>
  <div id="box">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <MainBox></MainBox>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "./Header/Header.vue";
import MainBox from "./MainBox/MainBox.vue";
export default {
  name: "Index",
  components: { Header, MainBox },
};
</script>

<style scoped>
#box {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #333;
}
.el-footer {
  background-color: #333;
}
</style>