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
import Footer from "./footer"
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
  methods: {}
};
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>
