<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane v-for="(city, index) in cities" :key="index" :label="city" :name="city">
      {{ city }}
      <el-row :gutter="20">
        <el-col :span="6" v-for="(o, index) in 4" :key="o">
          <el-card @click.native="handleJump(index ,city)">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div class="detail">
              <span class="name">好吃的汉堡</span>
              <!-- <div class="bottom clearfix">
                <el-button type="text" class="button">
                  动手制作美食
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </div> -->
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
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleJump(index,city) {
      console.log(this);
      this.$router.push({
        name: "foodDetail",
        query: { id: index, city:city }
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
