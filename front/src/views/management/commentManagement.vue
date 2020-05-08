<template>
  <div class="management-content">
    <!--表单-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input
          v-model.trim="formInline.user.uname"
          placeholder="用户名"
          style="width: 140px;"
          clearable
        ></el-input>
      </el-form-item>
      <el-date-picker
        v-model="formInline.user.time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="编号" width="90"></el-table-column>
      <el-table-column prop="uname" label="用户名" width="160"></el-table-column>
      <el-table-column prop="time" label="评论时间" width="160" :formatter="formatTime"></el-table-column>
      <el-table-column prop="content" label="评论内容" width="250"></el-table-column>
      <el-table-column prop="type" label="评论区" width="90" :formatter="formatType"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="info" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页符 -->
    <pagination :total="total" :queryInfo="queryInfo" :inquireList="queryList"></pagination>

    <!-- 编辑框 -->
    <el-dialog title="修改评论信息" :visible="dialogFormVisible" width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.uname"></el-input>
        </el-form-item>
        <el-form-item label="评论时间">
          <el-input v-model="form.time" disabled></el-input>
        </el-form-item>
        <el-form-item label="评论内容">
          <el-input v-model="form.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="评论区">
          <el-input v-model="form.type"></el-input>
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
import { formatTime } from "../../utils/index.js";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      dialogFormVisible: false,
      editLoading: false,
      total: 0,
      table_index: 999,
      multipleSelection: [],
      tableData: [
        {
          id: 1,
          time: "2016-05-02 12:24:13",
          uname: "王小虎",
          content:
            "上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄",
          type: 0
        }
      ],
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      form: {
        uname: "",
        time: "",
        content: "",
        type: ""
      },
      formInline: {
        user: {
          uname: "",
          time: ""
        }
      }
    };
  },
  methods: {
    queryCountComment() {
      // 获取总数
      this.axios
        .get("/api/manager/getCountComment")
        .then(res => {
          this.total = res.data.data[0].total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    queryList(data = this.queryInfo) {
      // 翻页
      this.axios
        .get("/api/manager/getCommentByPage", { params: data })
        .then(res => {
          let result = res.data.data;
          this.tableData = result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSearch() {
      if (
        this.formInline.user.uname.length === 0 &&
        this.formInline.user.time.length === 0
      ) {
        this.queryList();
      } else if (
        this.formInline.user.uname &&
        this.formInline.user.time.length === 0
      ) {
        this.axios
          .get("/api/manager/getCommentByName", {
            params: {
              uname: this.formInline.user.uname
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.status === "error") {
              this.$message({
                message: res.data.msg,
                type: res.data.status
              });
            } else {
              let result = res.data.data;
              this.tableData = result;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (
        this.formInline.user.uname.length === 0 &&
        this.formInline.user.time.length !== 0
      ) {
        this.axios
          .get("/api/manager/getCommentByTime", {
            params: {
              startTime: formatTime(this.formInline.user.time[0]),
              endTime: formatTime(this.formInline.user.time[1])
            }
          })
          .then(res => {
            // console.log(res);
            if (res.data.status === "error") {
              this.$message({
                message: res.data.msg,
                type: res.data.status
              });
            } else {
              let result = res.data.data;
              this.tableData = result;
            }
          });
      } else if (
        this.formInline.user.uname.length !== 0 &&
        this.formInline.user.time.length !== 0
      ) {
        this.axios
          .get("/api/manager/getCommentByNameAndTime", {
            params: {
              uname: this.formInline.user.uname,
              startTime: formatTime(this.formInline.user.time[0]),
              endTime: formatTime(this.formInline.user.time[1])
            }
          })
          .then(res => {
            // console.log(res);
            if (res.data.status === "error") {
              this.$message({
                message: res.data.msg,
                type: res.data.status
              });
            } else {
              let result = res.data.data;
              this.tableData = result;
            }
          });
      }
    },
    // eslint-disable-next-line no-unused-vars
    handleDelete(index, row) {
      // 连续删除未完成
      const Ids = [];
      if (this.multipleSelection.length !== 0) {
        this.multipleSelection.forEach(item => {
          Ids.push(item.id);
        });
      } else {
        Ids.push(row.id);
      }
      this.axios
        .post("/api/manager/delMultiCommentById", { id: Ids })
        .then(res => {
          let message = res.data.msg;
          this.queryList();
          this.queryCountComment();
          this.$message({
            message: message,
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
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
          this.axios
            .post("/api/manager/alertComment", this.form)
            .then(res => {
              // console.log(res);
              if (res.data.status === "success") {
                this.tableData.splice(this.table_index, 1, this.form);
              }
              this.$message({
                message: res.data.msg,
                type: res.data.status
              });
            })
            .catch(err => {
              console.log(err);
            });
          this.editLoading = false;
          this.dialogFormVisible = false;
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    formatTime(row) {
      return formatTime(row.time);
    },
    formatType(row) {
      if (Number(row.type) === 0) {
        return "美食区";
      } else if (Number(row.type) === 1) {
        return "故事区";
      } else {
        return "";
      }
    }
  },
  created() {
    this.queryList(), this.queryCountComment();
  }
};
</script>

<style lang="scss" scoped>
</style>