<template>
  <el-pagination
    background
    layout="total, prev, pager, next,sizes"
    :current-page="queryInfo.pageNum"
    :page-size="queryInfo.pageSize"
    :total="total"
    :page-sizes="[10, 20, 50,100]"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    queryInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    inquireList: {
      type: Function
    }
  },
  methods: {
    handleSizeChange(value) {
      console.log(value)
      this.queryInfo.pageSize = value;
      this.queryInfo.pageNum = 1;
      this.inquireList && this.inquireList(this.queryInfo);
    },
    handleCurrentChange(value) {
      console.log(value)
      this.queryInfo.pageNum = value;
      this.inquireList && this.inquireList(this.queryInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
    text-align: center;
    margin-top: 30px;
  }
</style>
