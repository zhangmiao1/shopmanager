<template>
  <div class="bodyBack">
    <el-form label-position="top" label-width="80px" :model="formdata" class="formSet">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="success">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post(`login`, this.formdata)
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = res
      if (status === 200) {
        localStorage.setItem('token', data.token)
        this.$router.push({
          name: 'home'
        })
      } else {
        // 提示框 -> UI
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style  scoped>
.bodyBack {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.formSet {
  width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
.login-btn {
  width: 100%;
}
* {
  padding: 0;
  margin: 0;
}
</style>
