<template>
  <el-card class="card">
    <cub-bread level1="权限管理" level2="角色列表"></cub-bread>
    <el-button class="addBtn" type="primary" @click="addRole()">添加角色</el-button>
    <!-- 列表 -->
    <el-table :data="roles" style="width: 100%" height="350px">
      <el-table-column type="expand" width="80">
        <template slot-scope="scope">
          <el-row v-for="(item1) in scope.row.children" :key="item1.id">
            <el-col :span="4">
              <el-tag
                @close="deleteRoleright(scope.row,item1)"
                closable
                type="success"
              >{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2) in item1.children" :key="item2.id">
                <el-col :span="4">
                  <el-tag
                    @close="deleteRoleright(scope.row,item2)"
                    closable
                    type="warning"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="deleteRoleright(scope.row,item3)"
                    closable
                    type="info"
                    v-for="(item3) in item2.children"
                    :key="item3.id"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length===0">
            <el-col>
              <span>未分配权限</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="150"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="400"></el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain
            @click="editRoles(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
            @click="deleteRoles(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain
            @click="showDiaSetRights(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框  --角色权限 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisibleAdd">
      <!-- 树形 -->
      <el-tree
        :data="list"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrCheck"
        :props="defaultProps"
        ref="tree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框 --编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisibleEdit">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="角色名称">
          <el-input v-model="formdata.roleName" disabled></el-input>
        </el-form-item>

        <el-form-item label="角色描述">
          <el-input v-model="formdata.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUserData()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框--添加用户 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisibleRoleAdd">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="角色名称">
          <el-input v-model="formdata.roleName"></el-input>
        </el-form-item>

        <el-form-item label="角色描述">
          <el-input v-model="formdata.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRoleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUserData()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRoleAdd:false,

      //  树形配置
      list: [],

      arrCheck: [],
      defaultProps: {
        label: "authName",
        children: "children"
      },
      currRoleId: -1,
      formdata: {
        roleName: "",
        roleDesc: ""
      }
    };
  },
  methods: {
    //添加角色对话框
    addRole() {
      this.dialogFormVisibleRoleAdd=true
      this.formdata={}
    },
    //添加角色
    async addUserData(){
     
      const res = await this.$http.post(`roles`,this.formdata)
      console.log(res)
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 201) {
        this.dialogFormVisibleRoleAdd = false;
        this.formdata = data;
        this.getRoles()
        

      }
    },
    
    //编辑提交角色
    async editUserData() {
      const res = await this.$http.put(
        `roles/${this.formdata.roleId}`,
        this.formdata
      );

      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.dialogFormVisibleEdit = false;
        this.formdata.roleDesc = data.roleDesc;
      }
    },
    //添加角色
    async editRoles(role) {
      this.dialogFormVisibleEdit = true;
      const res = await this.$http.get(`roles/${role.id}`);

      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.formdata = data;
        this.$message.success(msg);
      }
    },
    //删除角色
    async deleteRoles(role) {
      console.log(role);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`roles/${role.id}`);
          const {
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.getRoles();
            this.$message.success(msg);
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    //分配角色权限
    async setRoleRight() {
      //获取全选的id  this.$refs.ref的值.js方法   ref操作DOM
      const arr1 = this.$refs.tree.getCheckedKeys();
      //获取半选的id
      const arr2 = this.$refs.tree.getHalfCheckedKeys();
      const arr = [...arr1, ...arr2];
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: arr.join(",")
      });

      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.getRoles();
        this.dialogFormVisibleAdd = false;
      }
    },
    //展示角色权限对话框
    async showDiaSetRights(role) {
      this.dialogFormVisibleAdd = true;
      this.currRoleId = role.id;
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      //获取所有角色权限
      const res = await this.$http.get(`rights/tree`);
      console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.list = data;
      }
      const imp = [];
      role.children.forEach(item1 => {
        // imp.push(item1.id);
        item1.children.forEach(item2 => {
          //   imp.push(item2.id);
          item2.children.forEach(item3 => {
            imp.push(item3.id);
          });
        });
        this.arrCheck = imp;
      });
      // console.log(this.arrCheck);
    },
    //删除角色权限
    async deleteRoleright(roles, right) {
      const res = await this.$http.delete(
        `roles/${roles.id}/rights/${right.id}`
      );

      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        roles.children = data;
      }
    },
    async getRoles() {
      const res = await this.$http.get(`roles`);

      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.roles = data;
      }
    }
  },
  created() {
    this.getRoles();
  }
};
</script>

<style>
.card {
  height: 100%;
}

.addBtn {
  margin-top: 15px;
}
</style>
