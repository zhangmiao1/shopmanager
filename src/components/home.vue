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
            <el-submenu :index="item1.order+''" v-for='(item1) in menus' :key="item1.id" >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item1.authName}}</span>
              </template>
              <el-menu-item :index="item2.path" v-for='(item2) in item1.children' :key="item2.id">
                <i class="el-icon-menu"></i>
               {{item2.authName}}
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
    return {
      menus:[]
    }
  },
  methods: {
    //动态导航
  async getMenus(){
    const res=await this.$http.get(`menus`)
    console.log(res)
    const {data,meta:{msg,status}}=res.data
    if(status===200){
      this.menus=data
    }
  },
    goLogin () {
      localStorage.clear()
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
    // const token = localStorage.getItem('token')
    // if (!token) {
    //   this.$router.push({
    //     name: 'login'
    //   })
    //   this.$message.warning('请先登录')
    // }
  },
  created(){
    this.getMenus()
  }
}
</script>

<style>
.contain {
  height: 100%;
}
.header {
  background-color: #bcbcbd;
}
/* .aside {
  background-color: green;
} */
.main {
  background-color: rgb(216, 216, 215);
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
