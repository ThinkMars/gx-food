<template>
  <div class="content-foodDetail">
    <el-card>
      <div class="food-info">
        <div class="pic">
          <img :src="this.info.pic" alt />
        </div>
        <div class="description">
          <p class="name">{{ this.info.name }}</p>
          <p class="peopleNum">份量：{{ this.info.peoplenum }}</p>
          <p class="prepareTime">准备时间：{{ this.info.preparetime }}</p>
          <p class="cookTime">烹饪时间：{{ this.info.cookingtime }}</p>
        </div>
      </div>
    </el-card>
    <el-card>
      <div class="content" v-html="this.info.content"></div>
      <div class="material">
        <p class="title">用料：</p>
        <ul>
          <li
            v-for="(item, index) in material"
            :key="index"
            class="material-li"
          >{{item.mname}}:{{ item.amount }}</li>
        </ul>
      </div>
    </el-card>
    <el-card>
      <div class="process">
        <ul>
          <li v-for="(item, index) in process" :key="index" class="process-li">
            <p class="pcontent">
              <span class="number">{{ index+1 }}</span>
              <span v-html="item.pcontent">{{ item.pcontent }}</span>
            </p>
            <img :src="item.pic" alt="步骤" class="pcocess-img" />
          </li>
        </ul>
      </div>
    </el-card>
    <el-card>
      <comment :type="this.commentId"></comment>
    </el-card>
  </div>
</template>

<script>
import Comment from "../comment/comment.vue";
export default {
  components: {
    Comment
  },
  data() {
    return {
      // 评论类型
      commentId: 0,
      // 菜谱id
      sid: this.$route.query.sid,
      // 基本信息
      info: {
        name: "西红柿炒鸡蛋",
        peoplenum: "1-2人",
        preparetime: "10分钟内",
        cookingtime: "10分钟内",
        content:
          "西红柿炒鸡蛋可算是最为脍炙人口的家常美味。<br />而且也是很多厨房新手最先学会的一道菜品，红色西红柿搭配淡黄色鸡蛋，看着就让人很有食欲!西红柿和鸡蛋具有很好的养生保健功效，因此也是我们日常生活中不可缺少的一道佳肴，而且鸡蛋炒西红柿是营养素互补得很不错实例。在丰富营养的同时，还具有健脑抗衰老的作用。<br />此道佳肴看似简单，但要做好还是有些诀窍。厨房新手不妨和我一起试试这道最家常受欢迎的美味佳肴。",
        pic: "http://api.jisuapi.com/recipe/upload/20160719/115434_69386.jpg",
        tag:
          "懒人食谱,美容,炒,咸香,家常菜,防辐射,抗氧化,抗衰老,延缓衰老,缓解压力,开胃,冠心病,动脉硬化"
      },
      // 食材
      material: [
        {
          mname: "油",
          amount: "适量"
        },
        {
          mname: "盐",
          amount: "适量"
        },
        {
          mname: "白糖",
          amount: "2g"
        },
        {
          mname: "香油",
          amount: "适量"
        },
        {
          mname: "西红柿",
          amount: "2个"
        },
        {
          mname: "鸡蛋",
          amount: "3个"
        }
      ],
      // 步骤
      process: [
        {
          pcontent: "西红柿去皮备用。",
          pic: "http://api.jisuapi.com/recipe/upload/20160720/090147_36362.jpg"
        },
        {
          pcontent: "鸡蛋打散，西红柿切小块。",
          pic: "http://api.jisuapi.com/recipe/upload/20160720/090149_92039.jpg"
        },
        {
          pcontent: "炒锅倒油烧热倒入蛋液炒散盛出备用。",
          pic: "http://api.jisuapi.com/recipe/upload/20160720/090149_83647.jpg"
        },
        {
          pcontent: "锅中再加少许油爆香葱花。",
          pic: "http://api.jisuapi.com/recipe/upload/20160720/090150_54048.jpg"
        },
        {
          pcontent: "倒入西红柿翻炒片刻。",
          pic: "http://api.jisuapi.com/recipe/upload/20160720/090150_73049.jpg"
        },
        {
          pcontent: "加入盐。",
          pic: "http://api.jisuapi.com/recipe/upload/20160720/090150_39149.jpg"
        },
        {
          pcontent: "在加少许白糖炒均匀。",
          pic: "http://api.jisuapi.com/recipe/upload/20160720/090151_81369.jpg"
        },
        {
          pcontent: "把鸡蛋倒入混合均匀。",
          pic: "http://api.jisuapi.com/recipe/upload/20160720/090151_23731.jpg"
        },
        {
          pcontent: "淋入少许香油。",
          pic: "http://api.jisuapi.com/recipe/upload/20160720/090151_69068.jpg"
        },
        {
          pcontent: "翻炒均匀关火。",
          pic: "http://api.jisuapi.com/recipe/upload/20160720/090152_16699.jpg"
        }
      ]
    };
  },
  methods: {
    getFoodDetails() {
      if (this.sid !== null) {
        this.axios
          .get("/api/food/getFoodDetail", {
            params: {
              id: this.sid
            }
          })
          .then(res => {
            let result = res.data.result.result;
            this.info = {
              name: result.name,
              peoplenum: result.peoplenum,
              preparetime: result.preparetime,
              cookingtime: result.cookingtime,
              content: result.content,
              pic: result.pic,
              tag: result.tag
            };
            this.material = result.material;
            this.process = result.process;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.getFoodDetails();
  }
};
</script>

<style lang="scss" scoped>
.content-foodDetail {
  .el-card {
    margin-bottom: 10px;
  }
  .food-info {
    height: 250px;
    overflow: hidden;
    padding: 0 5%;
    .pic {
      width: 50%;
      float: left;
      margin-left: 20px;
    }
    .description {
      // width: 50%;
      float: left;
      .name {
        font-size: 24px;
      }
      .peopleNum {
        font-size: 16px;
        line-height: 50px;
        margin-top: 30px;
      }
      .prepareTime {
        font-size: 16px;
        line-height: 50px;
      }
      .cookTime {
        font-size: 16px;
        line-height: 50px;
      }
    }
  }
  .content {
    font-size: 14px;
    line-height: 24px;
    margin: 0 10%;
    padding: 10px;
    border-bottom: 1px dashed #999;
    border-right: 1px dashed #999;
  }
  .material {
    font-size: 14px;
    color: #999;
    line-height: 90px;
    padding: 0 10%;
    .title {
      float: left;
    }
    .material-li {
      float: left;
      margin-right: 20px;
    }
  }
  .process {
    padding: 0 10%;
    .process-li {
      height: 350px;
      padding: 40px 0;
      .pcontent {
        width: 50%;
        font-size: 16px;
        float: left;
        margin-top: 15px;
        .number {
          width: 20px;
          line-height: 20px;
          background-color: red;
          color: #fff;
          text-align: center;
          margin: 2px 5px 0;
          border-radius: 50%;
          display: block;
          float: left;
        }
      }
      .pcocess-img {
        width: 50%;
        height: 100%;
        float: left;
        display: block;
      }
    }
  }
}
</style>