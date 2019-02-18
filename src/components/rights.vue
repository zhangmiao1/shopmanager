<template>
    <el-card class="card">
        <cub-bread level1='权限管理' level2='权限列表'></cub-bread>
        <el-button type="primary" class='addRolebtn'>添加角色</el-button>
    </el-card>
</template>

<script>
export default {
    data(){
        return{
            list:[]
        }
    },
    methods:{
        async getRightsData(){
            const res=await this.$http.get(`rights/list`)
            console.log(res)
        }
    },
    created(){
        this.getRightsData()
    }

}
</script>

<style>
.card{
    height: 100%
}
.addRolebtn{
    margin-top: 10px;
}

</style>
