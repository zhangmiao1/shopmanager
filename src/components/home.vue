<template>
  <el-container class="contain">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">1</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">2</div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">3</div>
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
export default {}
</script>

<style>
.contain {
  height: 100%;
}
.header {
  background-color: red;
}
.aside {
  background-color: green;
}
.main {
  background-color: yellow;
}
</style>
