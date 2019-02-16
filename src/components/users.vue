<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row>
      <el-col>
        <el-input
          @clear="getAllUsers()"
          placeholder="请输入内容"
          v-model="query"
          class="searchBox"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click.prevent="searchUser()"></el-button>
        </el-input>
        <el-button type="primary" @click="addUser()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 用户列表 -->
    <el-table :data="list" style="width: 100%" class="tableCcc">
      <el-table-column prop="id" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="140"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
      <el-table-column label="创建日期" width="140">
        <!-- 当单元格数据不是prop的值时，用template -->
        <template slot-scope="scope">
          <!-- scope.row固定写法 -->
          {{scope.row.create_time | formdata}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="140">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @click="putStatus()"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template>
          <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
            @click="deleteUser()"
          ></el-button>
          <el-button type="success" icon="el-icon-check" circle size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisibleAdd">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUserData()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      list: [],
      total: -1,
      dialogFormVisibleAdd: false,
      formdata: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    // 更改用户状态
    async putStatus () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      // const res = await this.$http.put('users/:uId/state/:type',{
      //   uId:
      // })
    },

    // 清除搜索,获取所有用户数据
    getAllUsers () {
      this.getUserData()
    },

    // 删除用户
    deleteUser () {
      if (confirm('Sure?')) {
      }
    },
    // 弹出对话框
    addUser () {
      this.dialogFormVisibleAdd = true
    },
    // 提交用户
    async addUserData () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.post('users/', this.formdata)
      const {
        data,
        meta: { msg, status }
      } = res.data
      if (status === 201) {
        this.dialogFormVisibleAdd = false
        this.$message.success(msg)
        this.list = data
        this.getUserData()
      }
    },

    searchUser () {
      this.pagenum = 1
      this.getUserData()
    },
    // 获取用户列表
    async getUserData () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      )
      console.log(res)
      const {
        data,
        meta: { status }
      } = res.data
      if (status === 200) {
        this.list = data.users
        this.total = data.total
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagenum = 1
      this.pagesize = val
      this.getUserData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)

      this.pagenum = val
      this.getUserData()
    }
  },
  created () {
    // 首页加载user列表
    // 判断是否有token
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({
        name: 'login'
      })
      this.$message.warning('请先登录')
    }
    this.getUserData()
  }
}
</script>

<style>
.box {
  height: 100%;
}
.searchBox {
  width: 340px;
  margin-top: 10px;
}
.tableCcc {
  height: 400px;
}
</style>
