<template>
  <div>
    <el-header>
      <div class="logo">
        <img src="../assets/logo.png" alt="logo" height="60px" width="100px" />
      </div>
      <div class="top">
        <router-link to="" class="top_tittle">首页</router-link>
        <router-link to="" class="top_tittle">首页</router-link>
        <router-link to="" class="top_tittle">首页</router-link>
        <router-link to="" class="top_tittle">首页</router-link>
      </div>
      <div class="user">
        <el-dropdown
          style="
            width: 70px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            margin-right: 10px;
          "
        >
          <span
            style="
              display: flex;
              justify-content: center;
              flex-direction: column;
              margin-right: 5px;
            "
          >
            <img
              :src="sysuser.avatarUrl"
              style="
                width: 30px;
                height: 30px;
                line-height: 60px;
                border-radius: 50%;
              "
            />
          </span>
          <span
            style="
              display: flex;
              justify-content: center;
              flex-direction: column;
            "
          >
            {{ sysuser.username }}</span
          >
          <i
            class="el-icon-arrow-down"
            style="margin-right: 5px; line-height: 60px"
          ></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <p
                style="text-decoration: none; color: black"
                @click="finduserinfobyid"
              >
                个人信息修改
              </p></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>

        <el-button
          :type="sysuser.id ? 'danger' : 'primary'"
          round
          @click="loginORregister"
          >{{ sysuser.id ? "退出" : "登录" }}</el-button
        >
        <el-button
          type="warning"
          round
          @click="dialogFormVisible_register = true"
          >注册</el-button
        >
      </div>
    </el-header>
    <!-- -----------------登录------------------- -->
    <el-dialog
      title="登录"
      :visible.sync="dialogFormVisible_login"
      width="400px"
    >
      <el-form
        :model="sysuser"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            class="inputtools"
            placeholder="请输入用户名"
            v-model="sysuser.username"
            prefix-icon="el-icon-user"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            class="inputtools"
            placeholder="请输入密码"
            v-model="sysuser.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_login = false">取 消</el-button>
        <el-button type="primary" @click="Login">确 定</el-button>
      </div>
    </el-dialog>
    <!-- ----------------------注册--------------------------- -->
    <el-dialog
      title="注册"
      :visible.sync="dialogFormVisible_register"
      width="400px"
    >
      <el-form
        :model="register_form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            class="inputtools"
            placeholder="请输入用户名"
            v-model="register_form.username"
            prefix-icon="el-icon-user"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            class="inputtools"
            placeholder="请输入密码"
            v-model="register_form.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="别称" prop="password">
          <el-input
            class="inputtools"
            placeholder="请输入别称"
            v-model="register_form.nickname"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="password">
          <el-input
            class="inputtools"
            placeholder="请输入邮箱"
            v-model="register_form.email"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="password">
          <el-input
            class="inputtools"
            placeholder="请输入电话"
            v-model="register_form.phone"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_register = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>
    <!-- ----------------------用户信息修改--------------------------- -->
    <el-dialog
      title="用户信息修改"
      :visible.sync="dialogFormVisible_userinfo"
      width="400px"
    >
      <el-form
        :model="register_form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            class="inputtools"
            placeholder="请输入用户名"
            v-model="updateform.username"
            prefix-icon="el-icon-user"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            class="inputtools"
            placeholder="请输入密码"
            v-model="updateform.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="别称" prop="password">
          <el-input
            class="inputtools"
            placeholder="请输入别称"
            v-model="updateform.nickname"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="password">
          <el-input
            class="inputtools"
            placeholder="请输入邮箱"
            v-model="updateform.email"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="password">
          <el-input
            class="inputtools"
            placeholder="请输入电话"
            v-model="updateform.phone"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <span>用户头像(点击更换)</span>
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8001/my_oa/oss/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :headers="requestHeader"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="updateform.avatarUrl"
            :src="updateform.avatarUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_register = false">取 消</el-button>
        <el-button type="primary" @click="updateuser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import login from "@/api/Login";
import cookie from "js-cookie";
import { ServerIp } from "../../../oa_vue/public/config";
import tree from "../../../../../guli/源码/day18/前端整合代码/element-ui依赖/element-ui/packages/table/src/store/tree";
import user from "@/api/user";
export default {
  data() {
    return {
      userinfo: {
        avatarUrl: "",
      },
      dialogFormVisible_login: false,
      dialogFormVisible_register: false,
      dialogFormVisible_userinfo: false,
      sysuser: {},
      register_form: {},
      updateform: {},
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          { min: 3, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { min: 1, max: 20, message: "长度在 1 到 20个字符", trigger: "blur" },
        ],
        ninckname: [
          {
            required: true,
            message: "请输入别名",
            trigger: "blur",
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        电话: [
          {
            required: false,
            message: "请输入电话",
            trigger: "blur",
          },
          { min: 13, max: 13, message: "长度在13 个字符", trigger: "blur" },
        ],
      },
      requestHeader: {
        //未上传图片的请求头加token
        Authorization: cookie.get("token"),
      },
    };
  },
  methods: {
    Login() {
      this.$refs["ruleForm"].validate((vaild) => {
        if (vaild) {
          login.login(this.sysuser).then((res) => {
            console.log(res);
            //将token放入cookie中
            cookie.set("token", res.data.token, { domain: `${ServerIp}` });
            console.log(cookie.get("token"));
            //在跳转之前对token进行检查并把用户信息保存在cookie中
            login.checktoken().then((res) => {
              console.log("log=>", res);
              const userinfo = JSON.stringify(res.data.user);
              cookie.set("userinfo", userinfo, { domain: `${ServerIp}` });
              this.sysuser = res.data.user;
              this.dialogFormVisible_login = false;
            });
          });
        } else {
          return false;
        }
      });
    },
    loginORregister() {
      if (!this.sysuser.id) {
        this.dialogFormVisible_login = tree;
      } else {
        cookie.set("token", "", { domain: `${ServerIp}` });
        cookie.set("userinfo", "", { domain: `${ServerIp}` });
        window.location.reload();
      }
    },
    register() {
      login.register_common(this.register_form).then((res) => {
        this.$notify({
          message: "注册成功，将自动登录",
          type: "success",
        });
        this.sysuser = this.register_form;
        this.Login();
        this.dialogFormVisible_register = false;
      });
    },
    finduserinfobyid() {
      this.dialogFormVisible_userinfo = true;
      user.findUserById(this.sysuser.id).then((res) => {
        this.updateform = res.data.user;
      });
    },
    updateuser() {
      user.updateUser(this.updateform).then((res) => {
        this.$notify({
          message: "用户信息修改成功",
          type: "success",
        });
        this.dialogFormVisible_userinfo=false
        window.location.reload()
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(res.data);
      this.updateform.avatarUrl = res.data.url;
      this.$forceUpdate()
    },
    beforeAvatarUpload(file) {
      if (file.size > 0) {
        console.log("upload=>", file);
        this.file_flag = true;
      }
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },

  created() {
    //进入主页就要获取用户信息
    login.checktoken().then((res) => {
      console.log("log=>", res);
      const userinfo = JSON.stringify(res.data.user);
      cookie.set("userinfo", userinfo, { domain: `${ServerIp}` });
      this.sysuser = res.data.user;
    });
  },
};
</script>
<style>
.el-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  position: fixed;
  z-index: 100;
}
.el-header .logo {
  flex: 1;
}
.el-header .top {
  flex: 2;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 100;
}
.el-header .user {
  flex: 1;
  margin: 0;
  margin-left: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  line-height: 30px;
  padding: 5px;
}

.el-header .top .top_tittle {
  flex: 1;
  text-decoration: none;
  color: white;
  background-color: rgb(0, 0, 0);
  margin: 5px;

  line-height: 60px;
  text-align: center;
  height: 60px;
  font-size: 20px;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-header .top .top_tittle:hover {
  color: white;
  background-color: rgb(168, 76, 0);
  border: 1px solid #cccc;
  height: 70px;
  position: relative;
  bottom: -10px;
}
</style>