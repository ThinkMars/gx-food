<template>
  <div class="management-content">
    <!--表单-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model.trim="formInline.story.title" placeholder="请您输入故事的标题" style="width: 220px;" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="时间">
        <el-date-picker
          v-model="formInline.story.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </el-form-item> -->
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button
        type="danger"
        @click="addStory"
        class="addButton"
        icon="el-icon-circle-plus-outline"
      >新增故事信息</el-button>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="编号" width="90"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="createdTime" label="发表时间" width="180" :formatter="formatTime"></el-table-column>
      <el-table-column prop="abstract" label="摘要" width="200"></el-table-column>
      <el-table-column prop="content" label="内容" width="250"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="info" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页符 -->
    <pagination :total="total" :queryInfo="queryInfo" :inquireList="queryList"></pagination>

    <!-- 编辑列表 -->
    <el-dialog title="修改个人信息" :visible="dialogFormVisible" width="40%" :show-close="false">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="发表时间">
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="form.time"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="form.abstract" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 新增故事列表 -->
    <el-dialog title="添加故事信息" :visible="addFormVisible" width="40%" :show-close="false">
      <el-form ref="addForm" :model="addForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="addForm.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="发表时间">
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="addForm.time"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="addForm.abstract" type="textarea" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="addForm.content" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd" :loading="editLoading">添加</el-button>
          <el-button @click="addFormVisible = false">取消</el-button>
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
      addFormVisible: false,
      editLoading: false,
      total: 0,
      multipleSelection: [], // 多选框
      tableData: [
        {
          id: 1,
          createdTime: "2016-05-02",
          title: "王小虎",
          abstract: "",
          content:
            "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1516 弄上海市普陀区金沙江路 1516 弄"
        }
      ],
      // 查询列表
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      // 编辑框
      form: {
        title: "",
        content: "",
        time: "",
        abstract: ""
      },
      // 添加框
      addForm: {
        title: "",
        time: "",
        abstract: "",
        content: ""
      },
      // 搜索框
      formInline: {
        story: {
          title: "",
          time: "",
          abstract: "",
          content: ""
        }
      },
      table_index: 999
    };
  },
  methods: {
    queryCountStory() {
      // 获取总数
      this.axios
        .get("/api/manager/getCountStory")
        .then(res => {
          this.total = res.data.data[0].total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 翻页
    queryList(data = this.queryInfo) {
      this.axios
        .get("/api/manager/getStoryByPage", { params: data })
        .then(res => {
          let result = res.data.data;
          this.tableData = result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询功能
    handleSearch() {
      // this.$message("查询功能暂时没有");
      if (this.formInline.story.title.length === 0) {
        // 没有输入内容点击
        this.queryList();
      } else {
        this.axios
          .get("/api/manager/getStoryByTitle", {
            params: {
              title: this.formInline.story.title
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
    // 删除
    handleDelete(index, row) {
      // 连续删除未完成
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          const Ids = [];
          if (this.multipleSelection.length !== 0) {
            this.multipleSelection.forEach(item => {
              Ids.push(item.id);
            });
          } else {
            Ids.push(row.id);
          }
          this.axios
            .post("/api/manager/delMultiStoryById", { id: Ids })
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
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.table_index = index;
    },
    handleSave() {
      this.$confirm("确认修改吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          this.editLoading = true;
          const form = {
            title: this.form.title,
            content: this.form.content,
            time: formatTime(this.form.time),
            abstract: this.form.abstract
          };
          this.axios
            .post("/api/manager/alertStory", form)
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
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //   console.log(val);
    },
    addStory() {
      // console.log("点击了");
      this.addFormVisible = true;
    },
    // 新增信息提交
    handleAdd() {
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          this.editLoading = true;
          const addForm = {
            title: this.addForm.title,
            time: formatTime(this.addForm.time),
            abstract: this.addForm.abstract,
            content: this.addForm.content
          };
          this.axios
            .post("/api/manager/addStory", addForm)
            .then(res => {
              this.$message({
                message: res.data.msg,
                type: res.data.status
              });
              this.queryCountStory();
              this.queryList();
            })
            .catch(err => {
              console.log(err);
              this.$message.error("添加出错了");
            });
          this.editLoading = false;
          this.addFormVisible = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    formatTime(row) {
      return formatTime(row.createdTime);
    }
  },
  created() {
    this.queryList();
    this.queryCountStory();
  }
};
</script>

<style lang="scss" scoped>
.management-content {
  .addButton {
    float: right;
    margin-right: 10px;
  }
}
</style>