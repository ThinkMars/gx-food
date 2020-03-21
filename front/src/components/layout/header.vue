<template>
  <header>
    <div class="header-logo">
      <img src alt="广西美食网" />logo
    </div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      text-color="#626262"
      active-text-color="none"
      @select="handleSelect"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">美食推荐</el-menu-item>
      <el-menu-item index="3">美食故事</el-menu-item>
      <el-menu-item index="4">联系</el-menu-item>
      <el-menu-item index="5">管理员</el-menu-item>
      <el-avatar icon="el-icon-user-solid"></el-avatar>
    </el-menu>
  </header>
</template>

<script>
export default {
  data() {
    return {
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  methods: {
    handleSelect(key, path) {
      console.log(key, path);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
