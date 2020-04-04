<template>
  <div class="management-content">
    <!--表单-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.user.name" placeholder="姓名" style="width: 140px;"></el-input>
      </el-form-item>
      <el-date-picker
        v-model="formInline.user.date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="date" label="评论时间" width="180"></el-table-column>
      <el-table-column prop="content" label="评论内容" width="250"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页符 -->
    <pagination></pagination>

    <!-- 编辑框 -->
    <el-dialog title="修改评论信息" :visible="dialogFormVisible" width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="评论内容">
          <el-input v-model="form.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "./pagination.vue";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      dialogFormVisible: false,
      editLoading: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          email: "1234@qq.com",
          content:
            "上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          email: "1234@qq.com",
          content:
            "上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          email: "1234@qq.com",
          content:
            "上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          email: "1234@qq.com",
          content:
            "上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄"
        }
      ],
      options: [],
      form: {
        name: "",
        address: "",
        date: ""
      },
      formInline: {
        user: {
          name: "",
          date: "",
          address: []
        }
      },
      table_index: 999
    };
  },
  methods: {
    onSubmit() {
      this.$message("查询功能暂时没有");
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      this.$message({
        message: "操作成功！",
        type: "success"
      });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.table_index = index;
    },
    handleSave() {
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          this.editLoading = true;
          let date = this.form.date;
          if (typeof date === "object") {
            date = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate()
            ].join("-");
            this.form.date = date;
          }
          this.tableData.splice(this.table_index, 1, this.form);
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.editLoading = false;
          this.dialogFormVisible = false;
        })
        .catch(() => {});
    }
  },
  created() {},
  mounted() {
    console.log("用户管理");
  }
};
</script>

<style lang="scss" scoped>

</style>