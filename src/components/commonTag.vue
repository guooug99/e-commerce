<template>
  <div class="tabs">
    <el-tag
    v-for="(tag,index) in tags" 
    :key="tag.name"
    :closable="tag.name !== 'home'"
    :effect="$route.name === tag.name ? 'dark' : 'plain'"
    @click="changeMenu(tag)"
    @close="handleClose(tag,index)"
    size="small">
    {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
    name:'commonTag',
    data(){
        return{

        }
    },
    computed:{
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods: {
        ...mapMutations({
            close:'closeTag'
        }),
        changeMenu(item) {
            this.$router.push({name:item.name})
        },
        handleClose(tag,index) {
            // length是最后一个tag的索引值
            const length = this.tags.length - 1
            this.close(tag)
            // tag.name与当前路由不一致时，不需要改变tag当前聚焦的焦点
            if (tag.name !== this.$route.name) {
                return
            }
            // 点击的tag是最后一个tag时，焦点左移
            if (index === length) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            }else{
                // 当删除位于中间的tag时，焦点右移
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    },
}
</script>

<style lang="less" scoped>
.tabs {
    padding:20px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}

</style>