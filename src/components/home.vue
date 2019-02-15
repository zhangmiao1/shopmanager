<template>
  <div id="app">
    <el-container class="contain">
      <el-header class="header">
        <el-row>
          <el-col :span="4">
            <img src="@/assets/logo.png" alt>
          </el-col>
          <el-col :span="18">
            <h2 class="middle">电商后台管理系统</h2>
          </el-col>
          <el-col :span="1">
            <a href="#" class="link" @click.prevent="goLogin()">退出</a>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu default-active="2" class="el-menu-vertical-demo" unique-opened router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="users">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  methods: {
    goLogin () {
      this.$router.push({
        name: 'login'
      })
    },
    userINdex () {
      this.$router.push({
        name: 'users'
      })
    }
  },
  beforeMount () {
    // 首页加载user列表
    // 判断是否有token
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({
        name: 'login'
      })
      this.$message.warning('请先登录')
    }
    this.userINdex()
  }

}
</script>

<style>
.contain {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
/* .aside {
  background-color: green;
} */
.main {
  background-color: yellow;

}
.link {
  text-decoration: none;
  line-height: 60px;
}
* {
  padding: 0;
  margin: 0;
}
.middle {
  text-align: center;
  line-height: 60px;
}
</style>
