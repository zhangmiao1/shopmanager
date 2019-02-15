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
        <el-input placeholder="请输入内容" v-model="query" class="searchBox" clearable>
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
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template>
          <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
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

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 4,
      list: [],
      total: ''

    }
  },
  methods: {
    addUser () {

    },

    searchUser () {
      this.pagenum = 1
      this.getUserData()
    },
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
        data: { users, total },
        meta: { status }
      } = res.data
      if (status === 200) {
        this.list = users
        this.total = total
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
