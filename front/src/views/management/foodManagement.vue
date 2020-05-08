<template>
  <div class="management-content">
    <!--表单-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input
          v-model.trim="formInline.food.fname"
          placeholder="输入您要查找的美食名称"
          style="width: 220px;"
          clearable
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button
        type="danger"
        @click="addFood"
        class="addButton"
        icon="el-icon-circle-plus-outline"
      >新增美食信息</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="编号" width="90"></el-table-column>
      <el-table-column prop="fname" label="名称" width="180"></el-table-column>
      <el-table-column prop="img" label="Img" width="180"></el-table-column>
      <el-table-column prop="details" label="描述" width="180"></el-table-column>
      <el-table-column prop="s_id" label="查询id" width="180"></el-table-column>
      <el-table-column prop="city" label="城市" width="180"></el-table-column>
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
    <el-dialog title="修改美食信息" :visible="dialogFormVisible" width="40%" :show-close="false">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.fname"></el-input>
        </el-form-item>
        <el-form-item label="img">
          <el-input v-model="form.img"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.details" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="查询id">
          <el-input v-model="form.s_id"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 新增列表 -->
    <el-dialog title="添加美食信息" :visible="addFormVisible" width="40%" :show-close="false">
      <el-form ref="addForm" :model="addForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="addForm.fname" clearable></el-input>
        </el-form-item>
        <el-form-item label="img">
          <el-input v-model="addForm.img" disabled></el-input>
          <el-upload
            class="upload-demo"
            action="#"
            accept="image/jpeg, image/png"
            :auto-upload="true"
            :http-request="submitUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :before-upload="onBeforeUpload"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-progress="handleProgress"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">选择图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过800kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="addForm.details" type="textarea" clearable></el-input>
        </el-form-item>
        <el-form-item label="查询id">
          <el-input v-model="addForm.s_id" clearable></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="addForm.city" clearable></el-input>
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
          fname: "",
          img: "",
          details: "",
          S_id: "",
          city: ""
        }
      ],
      fileList: [
        /* {
          name: "food.jpeg",
          url: ""
        } */
      ],
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      // 添加框
      addForm: {
        fname: "",
        img: "",
        details: "",
        s_id: "",
        city: ""
      },
      // 编辑框
      form: {
        fname: "",
        img: "",
        details: "",
        s_id: "",
        city: ""
      },
      // 查询框
      formInline: {
        food: {
          fname: ""
        }
      },
      table_index: 999
    };
  },
  methods: {
    // 获取总数
    queryCountFoods() {
      this.axios
        .get("/api/manager/getCountFoods")
        .then(res => {
          // console.log(res)
          this.total = res.data.data[0].total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 翻页
    queryList(data = this.queryInfo) {
      this.axios
        .get("/api/manager/getAllFoodsByPage", { params: data })
        .then(res => {
          // console.log(res);
          let result = res.data.data;
          this.tableData = result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询内容
    handleSearch() {
      if (this.formInline.food.fname.length === 0) {
        // 没有输入内容点击
        this.queryList();
      } else {
        this.axios
          .get("/api/manager/getFoodByName", {
            params: {
              fname: this.formInline.food.fname
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
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          // 连续删除未完成
          const Ids = [];
          if (this.multipleSelection.length !== 0) {
            this.multipleSelection.forEach(item => {
              Ids.push(item.id);
            });
          } else {
            // 没有使用多选框，直接点击删除按钮
            Ids.push(row.id);
          }
          this.axios
            .post("/api/manager/delMultiFoodById", { id: Ids })
            .then(res => {
              let message = res.data.msg;
              this.queryList();
              this.queryCountFoods();
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
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          this.editLoading = true;
          this.axios
            .post("/api/manager/alertFood", this.form)
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
        .catch(error => {
          console.log(error);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    addFood() {
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
          this.axios
            .post("/api/manager/addFood", this.addForm)
            .then(res => {
              this.$message({
                message: res.data.msg,
                type: res.data.status
              });
              this.queryCountFoods();
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
    // 上传文件操作
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onBeforeUpload(file) {
      const isIMAGE = file.type === "image/jpeg" || "image/gif" || "image/png";
      const isLt1M = file.size / 800 / 1024 < 1;

      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 800k!");
      }
      return isIMAGE && isLt1M;
    },
    submitUpload(data) {
      let formdata = new FormData();
      formdata.append("file", data.file);
      console.log(formdata.get("file"));
      this.axios({
        method: "post",
        url: "/api/file/uploadImg",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          this.addForm.img = res.data.data.img;
          this.$message({
            type: res.data.status,
            message: res.data.msg
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSuccess() {
      this.$message("上传成功");
    },
    handleError() {
      this.$message("上传失败");
    },
    handleProgress() {
      // this.$message("上传中...")
    }
  },
  created() {
    this.queryCountFoods();
    this.queryList();
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