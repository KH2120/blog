<template>
  <div>
    <canvas
      ref="canvasTest1"
      id="canvasTest"
      width="1000px"
      height="400px"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  methods: {
    canvasDemo() {
      let canvasTest1 = this.$refs.canvasTest1;
      let canvasConttext1 = canvasTest1.getContext("2d");
      canvasConttext1.beginPath();
      canvasConttext1.fillRect(25, 25, 50, 50);
      canvasConttext1.clearRect(35, 35, 30, 30);
      canvasConttext1.strokeRect(100, 100, 50, 50);
    },
  },
  mounted() {
    this.canvasDemo();
  },
};
</script>

<style>
</style>