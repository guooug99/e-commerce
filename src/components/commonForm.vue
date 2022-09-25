<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline" >
    <el-form-item v-for="item in formLabel" :key="item.label" :label = "item.label">
        <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入'+item.label"
        v-model="formData[item.model]"
        ></el-input>
        <el-switch v-if="item.type === 'switch'" v-model="formData[item.model]" ></el-switch>
        <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="formData[item.model]"
        ></el-date-picker>
        <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="formData[item.model]">
          <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label = "item.label"
          :value="item.value"
          ></el-option>
       </el-select>
    </el-form-item>
    <!-- 如果上面的组件都不满足，我们可以通过slot自定义传入我们的内容 -->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
    name:'commonForm',
    props:{
        formLabel:Array,
        form:Object,
        inline:Boolean
    },
    data() {
        return {
            formData:this.form
        }
    },
    // 无效，再点编辑时仍是第一个人的信息
    // watch:{
    //   formData(newVal){
    //     this.formData = newVal
    //   }
    // }

}
</script>

<style>

</style>