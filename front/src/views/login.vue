<template>
  <div>
    <el-form
      :model="formInfo"
      status-icon
      :rules="rules"
      ref="formInfo"
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="uname">
        <el-input type="text" v-model="formInfo.uname" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="upass">
        <el-input type="password" v-model="formInfo.upass" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formInfo')">提交</el-button>
        <el-button @click="resetForm('formInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import storage from '../utils/storage.js'
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      // 登录信息
      formInfo: {
        uname: "",
        upass: ""
      },
      // 检验规则
      rules: {
        uname: [{ validator: validateUser, trigger: "blur" }],
        upass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 触发父组件Header事件，关闭弹窗
    handleClose() {
      this.$emit("login");
    },
    ...mapActions(["login"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 请求登录接口
          this.axios.post("/api/user/login", this.formInfo).then(res => {
            if (res.data.status === "success") {
              // console.log(res)
              let data = res.data.data[0];
              data.avatar = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              storage.set("user", data) // 将数据存在本地，然后直接从本地取，这样下次直接从本地储存取就行
              this.login(); // 触发vuex的actions的登录状态方法
              this.handleClose();
              this.$message.success(
                res.data.msg + "，" + "欢迎 " + this.formInfo.uname
              );
              this.formInfo = {};
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("出现错误，请联系管理员！");
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置按钮清除内容
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
