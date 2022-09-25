<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe>
        <el-table-column
            show-overflow-tooltip
            v-for="item in tableLabel"
            :key="item.prop"
            :label="item.label"
            :width="item.width ? item.width :125"
            
        >
        <template slot-scope="scope">
            <!--【slot-scope="scope"用于接收传入进插槽里的相关数据】 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，row是当前列的数据 -->
            <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
        </template>
    </el-table-column>
    <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
            <!-- handleEdit(scope.row)里的scope.row是所点击当前行的数据 -->
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger"  @click="handleDelete(scope.row)">删除</el-button>
        </template>
    </el-table-column>
    
    </el-table>
    <el-pagination
        class="pager"
        layout="prev,pager,next"
        :total="fromConfig.total"
        :current-page.sync="fromConfig.page"
        @current-change="changePage"
        :page-size="20"></el-pagination>
  </div>
</template>

<script>
export default {
    name:'commonTable',
    props:{
        tableData:Array,
        tableLabel:Array,
        config:Object
    },
    data() {
        return {
            fromConfig:this.config
        }
    },
    methods: {
        handleEdit(row){
            this.$emit('edit',row)
            // 这里row可以取到id
            // console.log(row,'row');
        },
        handleDelete(row){
            this.$emit('del',row)
            // 这里row可以取到id
            // console.log(row,'row');
        },
        changePage(page){
            this.$emit('changePage',page)
        }
    },
}
</script>

<style lang="less" scoped>
.common-table {
    //calc里的数据一定要留空格，别挨在一起
    height: calc(100% - 62px);
    // height: 92%;
    background-color: #fff;
    position: relative;
    .pager {
        position: absolute;
        bottom:0;
        right: 20px;
    }
}

</style>