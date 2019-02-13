<template>
  <div class="bodyBack">
    <el-form label-position="top" label-width="80px" :model="formdata" class="formSet">
      <h2>用户登录</h2>
      <el-form-item label="名称">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="success">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  }
};
</script>

<style>
.bodyBack {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
* {
  padding: 0;
  margin: 0;
}
</style>
