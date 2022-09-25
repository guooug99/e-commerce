<template>
  <div ref="echart"></div>
</template>

<script>
    // 折线图和柱形图的配置里有xAxis数据，饼状图没有
import * as echarts from 'echarts'
export default {
    props:{
        isAxisChart:{
            type:Boolean,
            default:true
        },
        chartData:{
            type:Object,
            default(){
                return {
                    xData:[],
                    // 一定记得加上[],不然报错说series is not defined,没有被定义
                    series:[]
                }
            }
        }
    },
    watch:{
        chartData: {
            handler: function(){
                this.initCharts()
            },
            deep:true
        }
    },
    methods: {
        initCharts(){
            this.initChartsData()
            // 判断echart是否存在，如果echart存在，则直接渲染;如果echart不存在，则需要初始化echart对象
            if (this.echart){
                this.echart.setOption(this.options)
            }else{
                // ?refs 加不加s？
                this.echart = echarts.init(this.$refs.echart)
                this.echart.setOption(this.options)
            }
        },
        initChartsData(){
            if(this.isAxisChart){
                this.axisOption.xAxis.data = this.chartData.xData
                this.axisOption.series = this.chartData.series
            }else{
                this.normalOption.series = this.chartData.series
            }
        }
    },
    data() {
        return {
            axisOption:{
                legend: {
                // 图例文字颜色
                textStyle: {
                    color: "#333",
                },
                },
                grid: {
                left: "20%",
                },
                // 提示框
                tooltip: {
                trigger: "axis",
                },
                xAxis: {
                type: "category", // 类目轴
                data: [],
                axisLine: {
                    lineStyle: {
                    color: "#17b3a3",
                    },
                },
                axisLabel: {
                    interval: 0,
                    color: "#333",
                },
                },
                yAxis: [
                {
                    type: "value",
                    axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                    },
                },
                ],
                color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                series: [],
            },
            normalOption:{
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [],
            },
            echart:null
        }
    },
    computed:{
        options (){
            return this.isAxisChart ? this.axisOption : this.normalOption
        }
    }

}
</script>

<style>

</style>