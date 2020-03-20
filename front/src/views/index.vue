<template>
  <div>
    <i class="el-icon-remove">fr</i>
    <p>我是身体</p>
    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true
    }
  }
};
</script>

<style>
</style>