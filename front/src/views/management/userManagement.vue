<template>
  <div class="management-content">
    <!--表单-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input
          v-model.trim="formInline.user.name"
          placeholder="用户名"
          style="width: 200px;"
          clearable
        ></el-input>
      </el-form-item>
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
      <el-table-column prop="uname" label="用户名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="auth_num" label="权限" width="180" :formatter="authFormat">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页符 -->
    <pagination :total="total" :queryInfo="queryInfo" :inquireList="queryList"></pagination>

    <!-- 编辑弹框 -->
    <el-dialog title="修改个人信息" :visible="dialogFormVisible" width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.uname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="form.auth_num" disabled></el-input>
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
      total: 0,
      table_index: 999,
      tableData: [
        // 列表渲染数据
        {
          id: 1,
          uname: "王小虎",
          email: "1234@qq.com",
          auth_num: 1
        }
      ],
      multipleSelection: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      form: {
        // 编辑框
        name: "",
        email: "",
        auth_num: ""
      },
      formInline: {
        // 查询参数
        user: {
          name: ""
        }
      }
    };
  },
  methods: {
    queryCountUser() {
      // 获取总数
      this.axios
        .get("/api/manager/getCountUser")
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
        .get("/api/manager/getUserByPage", { params: data })
        .then(res => {
          let result = res.data.data;
          this.tableData = result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSearch() {
      if (this.formInline.user.name.length === 0) {
        this.queryList();
      } else {
        this.axios
          .get("/api/manager/getUserByName", {
            params: {
              uname: this.formInline.user.name
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
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // eslint-disable-next-line no-unused-vars
    handleDelete(index, row) {
      // 连续删除未完成
      const Ids = [];
      this.multipleSelection.forEach(item => {
        Ids.push(item.id);
      });
      this.axios
        .post("/api/manager/delMultiUserById", { id: Ids })
        .then(res => {
          let message = res.data.msg;
          this.queryList();
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
          // 成功
          this.editLoading = true;
          this.axios
            .post("/api/manager/alertUser", this.form)
            .then(res => {
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
        .catch(err => {
          // 失败
          console.log(err);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //   console.log(val);
    },
    authFormat(row) { // 表格权限格式化
      if (Number(row.auth_num) === 0) {
        return "普通用户";
      } else if (Number(row.auth_num) === 1) {
        return "管理员";
      } else {
        return "";
      }
    }
  },
  created() {
    this.queryCountUser();
    this.queryList();
  }
};
</script>

<style lang="scss" scoped>
</style>