<template>
  <div class="main-content">
    <!-- 轮播图 -->
    <div class="content-carousel">
      <el-carousel indicator-position="outside" height="500px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <!-- <h3>{{ item }}</h3> -->
          <img :src="item.Img" alt :style="{ width: '100%', height: '100%' }" fit="cover" />
          <!-- <el-image style="width: 100%; height: 100%" :src="item.Img" fit="fill"></el-image> -->
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 美食推荐模块 -->
    <div class="content-recommend" index="2">
      <h2 class="title">美食推荐</h2>
      <food-list></food-list>
      <router-view></router-view>
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
import Footer from "./footer/footer.vue";
export default {
  components: {
    FoodList,
    FoodStory,
    Footer
  },
  data() {
    return {
      value: true,
      // img:
      //   "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      bannerList: [
        {
          name: "汉堡包",
          img:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          name: "汉堡包",
          img:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        }
      ]
    };
  },
  methods: {
    getLunbotu() {
      this.axios
        .get("/api/food/getLunbotu")
        .then(res => {
          let result = res.data.data;
          this.bannerList = result;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getLunbotu();
  }
};
</script>

<style lang="scss" scoped>
</style>
