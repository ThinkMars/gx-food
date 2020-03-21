<template>
  <el-row :gutter="30">
    <el-col :span="12">
      <ul>
        <li v-for="(item, index) in story" :key="index" @click="handleJump">
          <h3 class="sub-title">{{ item }}</h3>
          <p class="time">2020-03-21</p>
        </li>
      </ul>
    </el-col>
    <el-col :span="12">
      <ul>
        <li v-for="(item, index) in story" :key="index"  @click="handleJump">
          <h3 class="sub-title">{{ item }}</h3>
          <p class="time">2020-03-21</p>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      story: [
        "你知道螺蛳粉的由来吗",
        "你知道螺蛳粉的由来吗",
        "你知道螺蛳粉的由来吗",
        "你知道螺蛳粉的由来吗",
        "你知道螺蛳粉的由来吗"
      ],
      currentDate: new Date()
    }
  },
  methods: {
    handleJump() {
      console.log(123);
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin text-overflow {
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
}
.el-row {
  .el-col {
    ul {
      padding: 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      li {
        height: 20px;
        padding: 5px 0;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          color: red;
        }
        .sub-title {
          float: left;
        }
        .time {
          float: right;
        }
      }
    }
  }
}
</style>
