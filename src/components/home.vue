<template>
  <el-container class="contain">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
         <img src="@/assets/logo.png" alt="">
        </el-col>
        <el-col :span="18">
          <h2 class='middle'>电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a href="#" class='link'  @click.prevent='goLogin()'>退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    goLogin(){
      this.$router.push({
        name:'login'
      })
    }
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
.aside {
  background-color: green;
}
.main {
  background-color: yellow;
}
.link{
  text-decoration: none;
  line-height: 60px;
}
*{
  padding: 0;
  margin: 0;
}
.middle{
  text-align: center;
  line-height: 60px;
}
</style>
