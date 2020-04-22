<template>
  <el-row :gutter="30">
    <el-col :span="12">
      <ul>
        <li
          v-for="(item, index) in storyLeft"
          :key="index"
          @click="handleJump(item.id, item.createdTime)"
        >
          <h3 class="sub-title">{{ item.title }}</h3>
          <p class="time">{{ item.createdTime|timeFormat }}</p>
        </li>
      </ul>
    </el-col>
    <el-col :span="12">
      <ul>
        <li
          v-for="(item, index) in storyRight"
          :key="index"
          @click="handleJump(item.id, item.createdTime)"
        >
          <h3 class="sub-title">{{ item.title }}</h3>
          <p class="time">{{ item.createdTime|timeFormat }}</p>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      storyLeft: [
        {
          id: 1,
          title: "你知道螺蛳粉的由来吗",
          createdTime: Date.now()
        },
        {
          id: 1,
          title: "你知道螺蛳粉的由来吗",
          createdTime: Date.now()
        },
        {
          id: 1,
          title: "你知道螺蛳粉的由来吗",
          createdTime: Date.now()
        },
        {
          id: 1,
          title: "你知道螺蛳粉的由来吗",
          createdTime: Date.now()
        },
        {
          id: 1,
          title: "你知道螺蛳粉的由来吗",
          createdTime: Date.now()
        }
      ],
      storyRight: [
        {
          id: 1,
          title: "你知道螺蛳粉的由来吗",
          createdTime: Date.now()
        },
        {
          id: 1,
          title: "你知道螺蛳粉的由来吗",
          createdTime: Date.now()
        },
        {
          id: 1,
          title: "你知道螺蛳粉的由来吗",
          createdTime: Date.now()
        },
        {
          id: 1,
          title: "你知道螺蛳粉的由来吗",
          createdTime: Date.now()
        },
        {
          id: 1,
          title: "你知道螺蛳粉的由来吗",
          createdTime: Date.now()
        }
      ]
    };
  },
  methods: {
    handleJump(id, time) {
      // 跳转到详情
      this.$router.push({
        name: "storyDetail",
        query: {
          id: id,
          time: time
        }
      });
    },
    getStoryTitle() {
      this.axios
        .get("/api/story/getStoryTitle")
        .then(res => {
          let data = res.data.data;
          let length = data.length;
          for (let i = 0; i < length; i++) {
            if (data[i].createdTime === null) {
              data[i].createdTime = Date.now();
            }
          }
          this.storyLeft = data.slice(0, 5);
          this.storyRight = data.slice(5, data.length + 1);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getStoryTitle();
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
