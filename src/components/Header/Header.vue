<template>
  <div>
    <el-row>
      <el-col :span="6"><div class="navBar"></div></el-col>
      <el-col :span="6"
        ><div class="navBar">
          <div class="box">
            <img
              src="../../assets/KH.jpg"
              alt=""
              id="logo"
              @click="logout"
              v-if="!$store.state.isLogin"
            />

            <el-popover placement="top" width="100" v-if="$store.state.isLogin">
              <el-tag><i class="el-icon-message"></i>：{{ info.email }}</el-tag>
              <br />
              <el-tag
                >性别：{{ info.sex }}
                <i
                  :class="info.sex == '男' ? 'el-icon-male' : 'el-icon-female'"
                ></i>
              </el-tag>
              <br />
              <el-button @click="logoutAxios">退出</el-button>
              <div id="ava" slot="reference">{{ NameAva }}</div>
            </el-popover>

            <h1 v-if="$store.state.isLogin">{{ info.name }}</h1>
            <h1 v-else>未登录</h1>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="navBar">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            background-color="#333"
            text-color="#fff"
            active-text-color="#fff"
          >
            <el-menu-item index="Home">首页</el-menu-item>
            <el-menu-item index="About">个人作品</el-menu-item>
            <el-menu-item index="Study">学习</el-menu-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :title="lgOrRe == true ? '登录' : '注册'"
      :visible.sync="dialogVisible"
      width="20%"
      modal
    >
      <div v-if="lgOrRe">
        <el-form label-position="left" label-width="80px" :model="loginArr">
          <el-form-item label="用户名">
            <el-input v-model="loginArr.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginArr.passWord"></el-input>
          </el-form-item>
          <div @click="toRegister">还没账号？点我注册</div>
          <br />
          <el-form-item>
            <el-button type="primary" @click="login"> 登录 </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="!lgOrRe">
        <el-form label-position="left" label-width="80px" :model="registerArr">
          <el-form-item label="用户名">
            <el-input v-model="registerArr.userName" required></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              v-model="registerArr.passWord"
              required
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
              v-model="registerArr.email"
              required
              type="email"
            ></el-input>
            <el-form-item label="性别">
              <el-radio-group v-model="registerArr.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form-item>

          <div @click="toRegister">已有账号？点我登录</div>
          <br />

          <el-form-item>
            <el-button type="primary" @click="register"> 注册 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "Home",
      circleUrl: "@/assets/KH.jpg",
      lgOrRe: true,
      dialogVisible: false,
      loginArr: {
        userName: "",
        passWord: "",
      },
      registerArr: {
        userName: "",
        passWord: "",
        email: "",
        sex: "男",
      },
      api: "/api",
      isLogin: false,
      info: {},
    };
  },
  computed: {
    NameAva() {
      if (this.info.name) {
        return this.info.name.slice(0, 1);
      }
    },
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key);
    },

    loginAxios() {
      this.axios
        .post(
          this.api + "/user/login/",
          `name=${this.loginArr.userName}&password=${this.loginArr.passWord}`,
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
          }
        )
        .then((response) => {
          if (response.data.code == 200) {
            this.$message.success(response.data.mes);
            localStorage.setItem("token", response.data.token);
            this.$store.commit("isLogin", true);
            this.dialogVisible = false;
          } else {
            this.$message.error(response.data.mes);
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },

    registerAxios() {
      this.axios
        .post(
          this.api + "/user/regist/",
          `name=${this.registerArr.userName}&password=${this.registerArr.passWord}&email=${this.registerArr.email}&sex=${this.registerArr.sex}`,
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
          }
        )
        .then((response) => {
          if (response.data.code == 200) {
            this.$message.success(response.data.mes);
            this.lgOrRe = true;
          } else {
            this.$message.error(response.data.mes);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loginReAxios() {
      this.axios
        .post(this.api + "/user/login/")
        .then((response) => {
          if (response.data.code == 200) {
            this.$message.success(response.data.mes);
            localStorage.setItem("token", response.data.token);
            this.$store.commit("isLogin", true);
            this.dialogVisible = false;
          } else {
            this.$message.error("未登录");
            this.dialogVisible = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    logoutAxios() {
      this.axios
        .get(this.api + "/user/logout/")
        .then((response) => {
          this.$message.success(response.data.mes);
          this.$store.commit("isLogin", false);
          this.info = {};
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getInfoAxios() {
      this.axios
        .get(this.api + "/user/info/")
        .then((response) => {
          if (response.data.code == 200) {
            this.$message.success(response.data.name);
            this.info = response.data;
            console.log(this.info);
          } else {
            this.$message.error(response.data.mes);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    login() {
      if (this.loginArr.userName === "" || this.loginArr.passWord === "") {
        this.$message.error("不能为空");
      } else {
        this.loginAxios();
      }
    },
    register() {
      if (
        this.registerArr.userName === "" ||
        this.registerArr.passWord === "" ||
        this.registerArr.email === ""
      ) {
        this.$message.error("不能为空");
      } else {
        this.registerAxios();
      }
    },

    toRegister() {
      this.lgOrRe = !this.lgOrRe;
    },
    logout() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.loginReAxios();
    console.log(this.$store.state.isLogin);
  },
  watch: {
    "$store.state.isLogin": {
      handler(value) {
        if (value) {
          this.getInfoAxios();
        }
        console.log(value, "watch");
      },
    },
  },
};
</script>

<style scoped>
.navBar {
  height: 60px;
  line-height: 60px;
}
.box {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
}
#logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.box h1 {
  font-size: 20px;
  color: white;
  margin-left: 10px;
}
#ava {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
}
</style>