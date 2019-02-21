<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <cub-bread level1="权限管理" level2="权限列表"></cub-bread>
    <!-- 搜索框 -->
    <el-row>
      <el-col>
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="searchBox"
          clearable
          @clear="getAllUser()"
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
            @change="changeMyStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain
            @click="editUserShow(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
            @click="deleteUser(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain
            @click="getUserRole(scope.row)"
          ></el-button>
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
    <!-- 对话框--添加用户 -->
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
    <!-- 对话框 --编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
          <el-input v-model="formdata.username" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUserData()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框 --角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form label-width="80px" :model="formdata">
        <el-form-item label="用户名">
          <span>{{formdata.username}}</span>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectVal" placeholder="请选择角色">
            <el-option label="请选择" :value="-1" disabled></el-option>
            <el-option
              v-for="(item) in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="addRoles()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      selectVal: -1,
      currUserId: -1,
      query: "",
      pagenum:1,
      pagesize: 2,
      list: [],
      total: -1,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      roles: []
    };
  },
  methods: {
    // 添加角色
    async addRoles() {
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.selectVal
      });
      const {
        data,
        meta: { status }
      } = res.data;
      if (status === 200) {
        this.dialogFormVisibleRole = false;
      }
    },
    // 角色对话框
    async getUserRole(users) {
      this.dialogFormVisibleRole = true;
      this.formdata = users;
      this.currUserId = users.id;
      // 角色获取
      const res1 = await this.$http.get(`roles`);
      // console.log(res1);
      this.roles = res1.data.data;
      // 获取指定用户的角色
      const res2 = await this.$http.get(`users/${users.id}`);
      // console.log(res2);

      this.selectVal = res2.data.data.rid;
    },
    // 弹出编辑框
    async editUserShow(users) {
      this.dialogFormVisibleEdit = true;
      console.log(users);
      const res = await this.$http.get(`users/${users.id}`);
      const {
        data,
        meta: { status }
      } = res.data;
      if (status === 200) {
        this.formdata = data;
      }
    },
    // 编辑用户
    async editUserData() {
      const res = await this.$http.put(
        `users/${this.formdata.id}`,
        this.formdata
      );
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.dialogFormVisibleEdit = false;
        this.$message.success(msg);
        this.getUserData();
      }
    },
    // 更改用户状态
    async changeMyStatus(user) {
      
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      // console.log(res)
    },
    // 清空搜索框，获取所有数据
    getAllUser() {
      this.getUserData();
    },
    // 删除用户
    deleteUser(users) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${users.id}`);
          const {
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.getUserData();
            this.$message.success(msg);
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 弹出对话框
    addUser() {
      this.dialogFormVisibleAdd = true;
      // 清空输入框
      this.formdata = {};
    },
    // 添加用户
    async addUserData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.post("users/", this.formdata);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 201) {
        this.dialogFormVisibleAdd = false;
        this.$message.success(msg);
        this.list = data;
        this.getUserData();
      }
    },

    searchUser() {
      this.pagenum = 1;
      this.getUserData();
    },

    async getUserData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );

      const {
        data: { users, total },
        meta: { status }
      } = res.data;
      if (status === 200) {
        this.list = users;
        this.total = total;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagenum = 1;
      this.pagesize = val;
      this.getUserData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);

      this.pagenum = val;
      this.getUserData();
    }
  },
  created() {
    // 首页加载user列表
    // 判断是否有token
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({
        name: "login"
      });
      this.$message.warning("请先登录");
    }
    this.getUserData();
  }
};
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
