<template>
  <div class="content-storyDetail">
    <el-card>
      <div class="content">
        <p class="title">{{ this.message.title }}</p>
        <p class="time">时间：{{ this.message.time|timeFormat }}</p>
        <div class="story" v-html="this.message.content"></div>
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
      commentId: 1, // 评论类型
      id: this.$route.query.id,
      time: this.$route.query.time*1,
      message: {
        title: "你知道***的由来吗",
        time: "2020-04-01 20:19",
        content:
          "白日依山尽，黄白白日依山白日依山尽，黄河入海流白日依山尽，黄河入海流白日依山尽，黄河入海流白日依山尽，黄河入海流白日依山尽，黄河入海流白日依山尽，黄河入海流白日依山尽，黄河入海流尽白日依山尽，黄河入海流，黄河入海流日依山尽白日依山尽，黄河入海流，黄河入海流白日依山尽，黄河入海流白日依山尽，黄河入海流河白日依山尽，黄河入海流入海流"
      }
    };
  },
  methods: {
    getStory() {
      this.axios
        .post("/api/story/getStoryById", {
          id: this.id
        })
        .then(res => {
          let data = res.data.data[0];
          const message = {
            title: data.title,
            time: this.time,
            content: data.content
          }
          this.message = message
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getStory()
  }
};
</script>

<style lang="scss" scoped>
.content-storyDetail {
  .el-card {
    margin-bottom: 10px;
  }
  .content {
    padding: 20px 8%;
    overflow: hidden;
    .title {
      font-size: 18px;
      text-align: center;
      margin-bottom: 20px;
    }
    .time {
      color: #999;
      padding: 15px 0;
      float: right;
    }
    .story {
      font-size: 14px;
      line-height: 20px;
      text-indent: 2em;
      float: left;
    }
  }
}
</style>