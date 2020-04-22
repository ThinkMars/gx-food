<template>
  <div class="content-comment">
    <h3 class="title">
      印象笔记
      <i class="el-icon-edit"></i>
    </h3>
    <div class="pushlish">
      <div class="avater">
        <!-- <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar> -->
        <el-avatar :src="avatarUrl"></el-avatar>
      </div>
      <el-input
        type="textarea"
        placeholder="对这道美食，您有什么特别深刻的印象呢？欢迎与我们分享"
        v-model="textarea"
        maxlength="150"
        show-word-limit
      ></el-input>
      <el-button @click="postComment" type="warning">提交评论</el-button>
    </div>
    <div class="nav">
      <p class="left">评论内容({{ commentsNum }})条</p>
    </div>
    <div class="comment-list">
      <ul>
        <li v-for="(item, index) in comments" :key="index" class="comment_li">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div class="details">
            <div class="info">
              <div class="name">{{ item.Uname }}</div>
            </div>
            <div class="content">{{ item.Content }}</div>
            <div class="time">{{ item.Time| timeFormat }}</div>
          </div>
        </li>
      </ul>
      <div class="more" @click="getMoreComments">点击加载更多...</div>
    </div>
  </div>
</template>

<script>
import { formatTime } from "../../utils/index.js";
import { mapGetters } from "vuex";
export default {
  props: {
    type: Number
  },
  data() {
    return {
      textarea: "",
      commentsNum: "",
      pageNum: 1,
      pageSize: 10,
      getMoreFlag: true, // 阻止重复点击评论按钮
      // avatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      // avatarUrl: this.userInfo.avatar,
      comments: [
        {
          Uname: "我爱做饭",
          Content:
            "这道菜真好吃这道菜真好吃这道菜真好这道菜真好吃这道菜真好吃这道菜真好吃",
          Time: "2020-04-14 16:36:24"
        },
        {
          Uname: "我爱做饭",
          Content:
            "这道菜真好吃这道菜真好吃这道菜真好这道菜真好吃这道菜真好吃这道菜真好吃",
          Time: formatTime(Date.now())
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    avatarUrl: function() {
      return (
        this.userInfo.avatar ||
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      );
    }
  },
  methods: {
    postComment() {
      // 用户信息

      if (this.userInfo.uname) { // 用户存在才能评论
        const commentInfo = {
          Type: this.type,
          Uname: this.userInfo.uname,
          Content: this.textarea.trim(), // 评论框内容,
          Time: formatTime(Date.now())
        };
        // 去空添加评论
        if (commentInfo.Content.trim().length === 0) {
          this.$message.error("评论内容不能为空");
        } else {
          this.axios
            .post("/api/comment/addComment", commentInfo)
            .then(res => {
              if (res.data.status == "error") {
                this.$message.error(res.data.msg);
              } else {
                this.$message.success(res.data.msg);
                this.comments.unshift(commentInfo);
                this.textarea = "";
                this.getTotalCommentsNum();
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }else {
        this.$message.error("需要登录才能评论哦")
      }
    },
    // 加载指定数量评论
    getCommentsByLimit() {
      this.axios
        .get("/api/comment/getComments", {
          params: {
            type: this.type,
            num: 15
          }
        })
        .then(res => {
          this.comments = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 评论总数
    getTotalCommentsNum() {
      this.axios
        .get("/api/comment/getCommentsNum", {
          params: {
            type: this.type
          }
        })
        .then(res => {
          this.commentsNum = res.data.data[0].total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 加载更多评论
    getMoreComments() {
      if (this.getMoreFlag) {
        this.axios
          .get("/api/comment/getCommentByPage", {
            params: {
              type: this.type,
              pageNum: this.pageNum++,
              pageSize: this.pageSize
            }
          })
          .then(res => {
            // console.log(res);
            if (res.data.status === "success") {
              this.comments = this.comments.concat(res.data.data);
            } else {
              this.getMoreFlag = !this.getMoreFlag;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.getCommentsByLimit();
    this.getTotalCommentsNum();
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