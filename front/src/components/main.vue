<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "./layout/header"
import Footer from "./layout/footer"
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style>
</style>