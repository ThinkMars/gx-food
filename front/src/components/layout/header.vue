<template>
  <header>
    <div class="header-logo" @click="handleJump('homepage')">
      <img src="../../assets/image/logo.png" alt="广西美食网" />
    </div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      text-color="#626262"
      active-text-color="none"
      @select="handleSelect"
    >
      <el-menu-item
        index="5"
        @click.native="handleJump('management')"
        v-if="this.userAuthList[0]"
      >管理员</el-menu-item>
      <div class="avatar-icon" @click="handleOpen">
        <span class="exit" v-if="this.isLogined" @click="logout">退出</span>
        <el-avatar :src="avatarUrl"></el-avatar>
      </div>
      <el-dialog :visible.sync="centerDialogVisible" width="35%" center>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="注册" name="login">
            <register @login="login"></register>
          </el-tab-pane>
          <el-tab-pane label="登录" name="register">
            <login @login="login"></login>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </el-menu>
  </header>
</template>

<script>
import Login from "../../views/login.vue";
import Register from "../../views/register.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Login,
    Register
  },
  data() {
    return {
      activeName: "login",
      centerDialogVisible: false
    };
  },
  computed: {
    ...mapGetters(["isLogined", "userInfo", "userAuthList"]),
    avatarUrl: {
      get: function() {
        return (
          this.userInfo.avatar ||
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        );
      },
      set: function() {}
    }
  },
  methods: {
    handleSelect(key, path) {
      console.log(key, path);
    },
    handleJump(path) {
      this.$router.push({
        name: path
      });
    },
    handleOpen() {
      if (!this.isLogined) {
        this.centerDialogVisible = !this.centerDialogVisible;
      } else {
        return;
      }
    },
    login() {
      // 登录成功后触发的操作
      if (this.isLogined) {
        this.centerDialogVisible = !this.centerDialogVisible; // 关闭弹窗
      }
    },
    logout() {
      localStorage.removeItem("user")
      // this.handleJump('home')
      // this.$router.go()
      window.location.href = "/index"
    },
    handleClick(tab, event) {
      //   console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
