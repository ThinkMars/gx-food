<template>
  <div class="content-comment">
    <h3 class="title">
      印象笔记
      <i class="el-icon-edit"></i>
    </h3>
    <div class="pushlish">
      <div class="avater">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>
      <el-input
        type="textarea"
        placeholder="对这道美食，您有什么特别深刻的印象呢？欢迎与我们分享"
        v-model="textarea"
        maxlength="150"
        show-word-limit
      ></el-input>
      <el-button @click="handleSubmit" type="warning">提交评论</el-button>
    </div>
    <div class="nav">
      <p class="left">评论内容(2条)</p>
    </div>
    <div class="comment-list">
      <ul>
        <li v-for="(item, index) in comments" :key="index" class="comment_li">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div class="details">
            <div class="info">
              <div class="name">{{ item.uname }}</div>
            </div>
            <div class="content">{{ item.content }}</div>
            <div class="time">{{ item.createdTime }}</div>
          </div>
        </li>
      </ul>
      <div class="more" @click="getMoreComments">点击加载更多...</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "", // 评论框内容,
      comments: [
        {
          uname: "我爱做饭",
          content:
            "这道菜真好吃这道菜真好吃这道菜真好这道菜真好吃这道菜真好吃这道菜真好吃",
          createdTime: "2020-04-01 20:19"
        },
        {
          uname: "我爱做饭",
          content:
            "这道菜真好吃这道菜真好吃这道菜真好这道菜真好吃这道菜真好吃这道菜真好吃",
          createdTime: "2020-04-01 20:19"
        }
      ]
    };
  },
  methods: {
    handleSubmit() {
      console.log("发表评论");
    },
    getMoreComments() {
      console.log("加载更多。。。");
      this.$message.warning("hahah，暂时没数据呢")
    }
  }
};
</script>

<style lang="scss" scoped>
.content-comment {
  padding: 10px 5%;
  .title {
    font-size: 18px;
    .el-icon-edit {
      margin-left: 5px;
      color: $bg-color;
    }
  }
  .pushlish {
    overflow: hidden;
    .avater {
      width: 40px;
      height: 40px;
      position: relative;
      top: 10px;
      margin-left: 10px;
      z-index: 100;
    }
    .el-textarea {
    }
    .el-textarea /deep/ .el-textarea__inner {
      height: 120px;
      padding: 25px 15px;
    }
    .el-button {
      background-color: $system-color;
      float: right;
      margin-top: 10px;
      &:hover {
        background-color: #ff9900;
      }
    }
  }
  .nav {
    font-size: 16px;
    padding: 15px 0;
  }
  .comment-list {
    overflow: hidden;
    .comment_li {
      border-bottom: 1px solid #eee;
      .el-avatar {
        width: 30px;
        height: 30px;
        float: left;
      }
      .details {
        overflow: hidden;
        .info {
          overflow: hidden;
          line-height: 40px;
          .name {
            color: skyblue;
            float: left;
            margin-left: 10px;
          }
        }
      }
      .content {
        font-size: 14px;
        padding: 0px 12px 15px;
      }
      .time {
        color: #999;
        padding: 0 10px 10px 0;
        float: right;
      }
    }
    .more {
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      color: #999;
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
  }
}
</style>