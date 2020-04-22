<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :stretch="true">
    <el-tab-pane v-for="(city, index) in cities" :key="index" :label="city" :name="city">
      <!-- {{ city }} -->
      <el-row :gutter="20">
        <el-col :span="6" v-for="(food, index) in foodList" :key="index">
          <el-card>
            <img :src="food.Img" class="image"  @click="handleJump(food.S_id)" />
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
      this.foodList.length = 0;
      this.foodList = this.total[this.activeName].slice(0, 4);
    },
    handleJump(id) {
      this.$router.push({
        name: "foodDetail",
        query: {
          sid: id
        }
      });
    },
    queryFood() {
      this.axios
        .post("/api/food/getFoodsByCity", {
          city: this.cities
        })
        .then(res => {
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
    cursor: pointer;
  }

  .detail {
    padding: 14px;
    text-align: center;
    .name {
      font-size: 14px;
      color: #999;
      &:hover {
        color: #000;
        cursor: default;
      }
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
