<template>
  <div>
    <div>
      <Canvas></Canvas>
    </div>
  </div>
</template>

<script>
import Canvas from "@/components/Canvas/Canvas.vue";
export default {
  name: "Home",
  components: { Canvas },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    if (!window.localStorage.getItem("login")) {
      this.dialogVisible = true;
    }
  },
};
</script>

<style>
</style>