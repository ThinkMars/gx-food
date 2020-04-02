<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane v-for="(city, index) in cities" :key="index" :label="city" :name="city">
      {{ city }}
      <el-row :gutter="20">
        <el-col :span="6" v-for="(food, index) in foodList" :key="index">
          <el-card @click.native="handleJump()">
            <img :src="food.img" class="image" />
            <div class="detail">
              <span class="name">{{ food.cname }}</span>
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
      cities: [
        "南宁市",
        "柳州市",
        "桂林市",
        "梧州市",
        "北海市",
        "防城港市",
        "钦州市",
        "贵港市",
        "玉林市",
        "百色市",
        "贺州市",
        "河池市",
        "来宾市",
        "崇左市"
      ],
      foodList: [
        {
          cname: "西红柿炒番茄",
          img:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          cname: "好吃的汉堡",
          img:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          cname: "好吃的汉堡",
          img:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          cname: "好吃的汉堡",
          img:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleJump() {
      this.$router.push({
        name: "foodDetail"
      });
    }
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
