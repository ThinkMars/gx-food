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
      <el-tab-pane label="美食管理" name="fourth" :lazy="true">
        <food-management></food-management>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import userManagement from "./userManagement.vue";
import commentManagement from "./commentManagement.vue";
import storyManagement from "./storyManagement.vue";
import foodManagement from "./foodManagement.vue"

export default {
  components: {
    userManagement,
    commentManagement,
    storyManagement,
    foodManagement
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
