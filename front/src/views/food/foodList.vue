<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :stretch="true">
    <el-tab-pane v-for="(city, index) in cities" :key="index" :label="city" :name="city">
      {{ city }}
      <el-row :gutter="20">
        <el-col :span="6" v-for="(food, index) in foodList" :key="index">
          <el-card @click.native="handleJump()">
            <img :src="food.Img" class="image" />
            <div class="detail">
              <span class="name">{{ food.Fname }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: "南宁市", // 必须为字符串类型
      currentDate: new Date(),
      cities: ["南宁市", "柳州市", "桂林市", "梧州市", "北海市"],
      total: {},
      foodList: [
        {
          Fname: "西红柿炒番茄",
          Img:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          Fname: "好吃的汉堡",
          Img:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          Fname: "好吃的汉堡",
          Img:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          Fname: "好吃的汉堡",
          Img:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      this.foodList.length = 0;
      this.foodList = this.total[this.activeName].slice(0, 4);
      //   console.log(this.foodList);
    },
    handleJump() {
      this.$router.push({
        name: "foodDetail"
      });
    },
    queryFood() {
      // let url = "http://localhost:3000"
      this.axios
        .post("http://localhost:3000/food/getFoodsByCity", {
          city: this.cities
        })
        .then(res => {
          // console.log(res.data.data)
          this.total = res.data.data;
          this.handleClick();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.queryFood();
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  padding-top: 0;
  .image {
    width: 100%;
    display: block;
  }

  .detail {
    padding: 14px;
    .name {
      text-align: center;
    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
      .el-button {
        .button {
          padding: 0;
          float: right;
        }
      }
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
  }
}
</style>
