<template>
  <header>
    <div class="header-logo">
      <img :src="url" alt="广西美食网" />
    </div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      text-color="#626262"
      active-text-color="none"
      @select="handleSelect"
    >
      <el-menu-item index="1" @click.native="handleJump('homepage')">首页</el-menu-item>
      <el-menu-item index="2">美食推荐</el-menu-item>
      <el-menu-item index="3">美食故事</el-menu-item>
      <el-menu-item index="4">联系</el-menu-item>
      <el-menu-item index="5">管理员</el-menu-item>
      <div class="avatar-icon" @click="login">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>
      <el-dialog :visible.sync="centerDialogVisible" width="35%" center>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="注册" name="login">
            <register></register>
          </el-tab-pane>
          <el-tab-pane label="登录" name="register">
            <login></login>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </el-menu>
  </header>
</template>

<script>
import Login from "../../views/login.vue";
import Register from "../../views/register.vue";
export default {
  components: {
    Login,
    Register
  },
  data() {
    return {
      activeName: "login",
      centerDialogVisible: false,
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  methods: {
    handleSelect(key, path) {
      console.log(key, path);
    },
    handleJump(path) {
      this.$router.push({ name: path });
    },
    login() {
      //   console.log("login");
      this.centerDialogVisible = !this.centerDialogVisible;
    },
    handleClick(tab, event) {
      //   console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
