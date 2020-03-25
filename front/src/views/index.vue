<template>
  <div class="main-content">
    <!-- 轮播图 -->
    <div class="content-carousel">
      <el-carousel indicator-position="outside" height="400px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 美食推荐模块 -->
    <div class="content-recommend" index="2">
      <h2 class="title">美食推荐</h2>
      <food-list></food-list>
    </div>

    <!-- 广西美食故事模块 -->
    <div class="content-story">
      <h2 class="title">美食故事</h2>
      <food-story></food-story>
    </div>
    <el-divider></el-divider>

    <!-- 底部联系模块 -->
    <div class="content-footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import FoodList from "./food/foodList.vue";
import FoodStory from "./story/foodStory.vue";
import Footer from "./footer";
export default {
  components: {
    FoodList,
    FoodStory,
    Footer
  },
  data() {
    return {
      value: true
    };
  },
  methods: {
  },
  mounted() {
    this.axios.get("/api/jisuapi/search?keyword=西红柿炒鸡蛋&num=1&appkey=1d5b6011908168f74182bb5e410b36a6").then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
};
</script>

<style lang="scss" scoped>
</style>
