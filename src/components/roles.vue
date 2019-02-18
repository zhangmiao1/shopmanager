<template>
  <el-card class="card">
    <cub-bread level1="权限管理" level2="角色列表"></cub-bread>
    <el-button class="addBtn" type="primary">添加角色</el-button>
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
          <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
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
        :default-checked-keys="checked"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleAdd = false">确 定</el-button>
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
      //  树形配置
      list: [],

      checked: [],
      defaultProps: {
        label: "authName",
        children: "children"
      }
    };
  },
  methods: {
    //展示角色权限对话框
    async showDiaSetRights(role) {
      this.dialogFormVisibleAdd = true;
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
      role.children.forEach(item => {
        imp.push(item.id);
        item.c
      });
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
