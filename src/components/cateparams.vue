<template>
  <el-card class="card">
    <cub-bread level1="商品管理" level2="分类参数"></cub-bread>
    <el-alert title="注意:只允许为第三级分类设置参数" type="warning" center show-icon class="alert"></el-alert>
    <el-form v-model="form" class="form" label-position="buttom" label-width="120px">
      <el-form-item label="请选择商品分类">
        <el-cascader
          clearable
          :show-all-levels="false"
          expand-trigger="hover"
          :options="options"
          :props="defaultProp"
          v-model="selectedOptions"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <!-- tab -->
    <el-tabs @tab-click="tabChange()" tab-position="top" style="height: 200px;" v-model="active">
      <el-tab-pane name="1" label="动态参数">
        <el-button type="primary" disabled>设置动态参数</el-button>
        <el-table height="450px" border stripe :data="arrActive" style="width: 100%">
          <!-- 序号 -->
          <el-table-column type="expand" width="120">
            <template slot-scope="scope">
              <!-- 动态tag编辑 -->
              <el-tag
                :key="i"
                v-for="(item,i) in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,item)"
              >{{item}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"></el-table-column>

          <el-table-column prop="attr_name" label="商品参数"></el-table-column>

          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="2" label="静态参数">
        <el-button type="primary" disabled>设置动态参数</el-button>
        <el-table height="450px" border stripe :data="arrStatis" style="width: 100%">
          <!-- 序号 -->
          <el-table-column type="index" label="#"></el-table-column>

          <el-table-column prop="attr_name" label="属性名称"></el-table-column>
          <el-table-column prop="attr_vals" label="属性值"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active: "1",
      inputVisible: false,
      inputValue: "",

      form: {},
      //级联
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id"
      },
      //动态数据
      arrActive: [],
      //静态数据
      arrStatis: []
    };
  },
  methods: {
    //删除标签
    async handleClose(obj, item) {
      obj.attr_vals.splice(obj.attr_vals.indexOf(item), 1);
      const res = await this.$http.put(
        `categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}`,
        {
          attr_name: obj.attr_name,
          attr_sel: obj.attr_sel,
          attr_vals: obj.attr_vals.join(",")
        }
      );
      console.log(res);
    },
    //
    async handleInputConfirm(obj) {
      const inputValue = this.inputValue;
      if (inputValue) {
        obj.attr_vals.push(inputValue);
        const res = await this.$http.put(
          `categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}`,
          {
            attr_name: obj.attr_name,
            attr_sel: obj.attr_sel,
            attr_vals: obj.attr_vals.join(",")
          }
        );
        this.inputValue = "";
        this.inputVisible = false;
      }
    },
    //
    showInput() {
      //显示输入框
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    async tabChange() {
      if (this.selectedOptions.length != 3) {
        this.$message.warning("请设置三级分类");
        if (this.active === "1") {
          this.arrActive = [];
        }
        if (this.active === "2") {
          this.arrStatis = [];
        }
      }
      if (this.active === "1") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        console.log(res);
        const {
          data,
          meta: { msg, status }
        } = res.data;
        if (status === 200) {
          this.arrActive = data;
          this.arrActive.forEach(item => {
            item.attr_vals =
              item.attr_vals.trim().length === 0
                ? []
                : item.attr_vals.trim().split(",");
          });
        }
      }
      if (this.active === "2") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only `
        );
        // console.log(res);
        const {
          data,
          meta: { msg, status }
        } = res.data;
        if (status === 200) {
          this.arrStatis = data;
        }
      }
    },
    //级联选择器发生变化时
    async handleChange() {
      //判断是否选择
      if (this.selectedOptions.length != 3) {
        this.$message.warning("请设置三级分类");
        if (this.active === "1") {
          this.arrActive = [];
        }
        if (this.active === "2") {
          this.arrStatis = [];
        }
      }
      if (this.active === "1") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );

        const {
          data,
          meta: { msg, status }
        } = res.data;
        if (status === 200) {
          this.arrActive = data;
          this.arrActive.forEach(item => {
            item.attr_vals =
              item.attr_vals.trim().length === 0
                ? []
                : item.attr_vals.trim().split(",");
          });
        }
      }
      if (this.active === "2") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only `
        );
        // console.log(res);
        const {
          data,
          meta: { msg, status }
        } = res.data;
        if (status === 200) {
          this.arrStatis = data;
        }
      }
    },
    //获取级联数据
    async getHandle() {
      const res = await this.$http.get(`categories?type=3`);
      console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.options = data;
        console.log(this.options);
      }
    }
  },
  created() {
    this.getHandle();
  }
};
</script>

<style>
.card {
  height: 100%;
}
.alert,
.form {
  margin-top: 10px;
}
</style>
