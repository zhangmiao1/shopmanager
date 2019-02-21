<template>
  <el-card class="card">
    <cub-bread level1="权限管理" level2="权限列表"></cub-bread>
    <el-button type="primary" class="addRolebtn">添加角色</el-button>
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    async getRightsData() {
      const res = await this.$http.get(`rights/list`);
      // console.log(res);
      const {
        meta: { status },
        data
      } = res.data;
      if (status === 200) {
        this.list = data;
      }
    }
  },
  created() {
    this.getRightsData();
  }
};
</script>

<style>
.card {
  height: 100%;
}
.addRolebtn {
  margin-top: 10px;
}
</style>
