<template>
  <el-card class="card">
    <cub-bread level1="商品管理" level2="商品列表"></cub-bread>
    <el-alert title="添加商品" type="info" center show-icon class="alert"></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active*1" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <!-- 基本信息  商品参数  商品属性 图片 内容 -->
    </el-steps>
    <!-- tab标签 -->
    <el-form v-model="form" class="form" label-position="top" label-width="80px">
      <el-tabs tab-position="left" v-model="active" @tab-click="changeData()">
        <el-tab-pane label="基本信息" name="1">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-form-item>
              <el-cascader
                expand-trigger="hover"
                :options="options"
                :props="defaultProp"
                v-model="selectedOptions2"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">
          <el-form-item :label="item1.attr_name" v-for="(item1) in arrActive" :key="item1.attr_id">
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox border :label="item2" v-for="(item2,i) in item1.attr_vals" :key="i"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="3">
          <el-form-item :label="item1.attr_name" v-for="(item1) in arrStatis" :key="item1.attr_id">
            <el-input v-model="item1.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="4">
          <el-form-item>
            <!-- 上传图片 -->
            <el-upload
              class="upload-demo"
              action="http://localhost:8888/api/private/v1/upload"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :headers='headers'
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
             
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active: "1",
      form: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: [],
        attrs: []
      },
      options: [],
      selectedOptions2: [1, 3, 6],
      defaultProp: {
        label: "cat_name",
        value: "cat_id"
      },
      //动态数据
      arrActive: [],
      //静态数据
      arrStatis: [],
      checkList: [],
      //上传
     headers: {
        Authorization: localStorage.getItem("token")
      }
    };
  },
  methods: {
    //上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleSuccess(response, file, fileList) {
     
      this.form.pics.push({
        pic: response.data.tmp_path
      });
      console.log(this.form.pics)
    },
    //动态数据
    async changeData() {
      if (this.active === "2" || this.active === "3") {
        if (this.selectedOptions2.length !== 3) {
          this.$message.error("请先选择三级分类!");
        }
        if (this.active === "3") {
          const res = await this.$http.get(
            `categories/${this.selectedOptions2[2]}/attributes?sel=only `
          );
          console.log(res);
          const {
            data,
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.arrStatis = data;
          }
        }
        if (this.active === "2") {
          const res = await this.$http.get(
            `categories/${this.selectedOptions2[2]}/attributes?sel=many`
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
      }
    },
    //级联选择器数据
    async getGoodsCate() {
      const res = await this.$http.get(`categories?type=3`);
      console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.options = data;
      }
    }
  },
  created() {
    this.getGoodsCate();
  }
};
</script>

<style>
.card {
  height: 100%;
}
.alert {
  margin-top: 20px;
  margin-bottom: 20px;
}
.form {
  margin-top: 20px;
  height: 400px;
  overflow: auto;
}
</style>
