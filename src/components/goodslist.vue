<template>
  <el-card class="box-card">
    <cub-bread level1="商品管理" level2="商品列表"></cub-bread>

    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="24">
        <el-input
          v-model="query"
          class="searchInput"
          clearable
          placeholder="请输入内容"
          @clear="clearQuery()"
        >
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="$router.push({name:'goodsadd'})" type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table height="450px" border stripe :data="list" style="width: 100%">
      <!-- 序号 -->
      <el-table-column type="index"></el-table-column>

      <el-table-column prop="goods_name" label="商品名称"></el-table-column>

      <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>

      <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>

      <el-table-column label="创建日期" width="120">
        <template slot-scope="scope">{{scope.row.add_time | formdata}}</template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            plain
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editgoods(scope.row)"
          ></el-button>
          <el-button
            plain
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deletegoods(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 对话框 --编辑商品 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisibleEdit">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="商品名称">
          <el-input v-model="formdata.goods_name" disabled></el-input>
        </el-form-item>

        <el-form-item label="商品数量">
          <el-input v-model="formdata.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="formdata.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="formdata.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editGoodsData()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      list: [],
      pagenum: 1,
      pagesize: 10,
      total: 0,
      //编辑商品
      dialogFormVisibleEdit: false,

      formdata: {
        goods_name: "",
        goods_number: "",
        goods_price: "",

        goods_weight: ""
      }
    };
  },
  methods: {
    //删除商品
    deletegoods(goods) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`goods/${goods.goods_id}`);
          const {
            data,
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.$message.success(msg);
            this.loadData()
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑对话框
    async editgoods(goods) {
      this.dialogFormVisibleEdit = true;

      const res = await this.$http.get(`goods/${goods.goods_id}`);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.formdata = data;
      }
    },
    //编辑商品
    async editGoodsData() {
      const res = await this.$http.put(
        `goods/${this.formdata.goods_id}`,
        this.formdata
      );
      console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.dialogFormVisibleEdit = false;
        this.loadData();
      }
    },
    //清空
    clearQuery() {
      this.loadData();
    },
    //查询
    handleSearch() {
      this.pagenum = 1;
      this.loadData();
    },
    async loadData() {
      const { data: resData } = await this.$http.get(
        `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      this.total = resData.data.total;
      this.list = resData.data.goods;

      // console.log(this.list);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val;
      this.pagenum = 1;
      this.loadData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val;
      this.loadData();
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>
.searchArea {
  margin: 10px 0;
}
.searchInput {
  width: 300px;
}
</style>
