<template>
  <div class="main-content">
    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
      <el-tab-pane label="用户管理" name="first" :lazy="true">
        <user-management></user-management>
      </el-tab-pane>
      <el-tab-pane label="评论管理" name="second" :lazy="true">
        <comment-management></comment-management>
      </el-tab-pane>
      <el-tab-pane label="故事管理" name="third" :lazy="true">
        <story-management></story-management>
      </el-tab-pane>
      <!-- <el-tab-pane label="菜谱管理" name="fourth">菜谱管理</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import userManagement from "./userManagement.vue";
import commentManagement from "./commentManagement";
import storyManagement from "./storyManagement";
export default {
  components: {
    userManagement,
    commentManagement,
    storyManagement
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
