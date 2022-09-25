<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg"/>
                    <div class="userInfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间:<span>2022-7-19</span></p>
                    <p>上次登录地点:<span>杭州</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px;height: 460px;">
                <el-table :data="tableData">
                    <el-table-column v-for="(val,key) in tableLabel"
                    :key="key"
                    :prop="key"
                    :label="val"></el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top:20px">
            <div class="num">
                <!-- :body-style="{display:'flex',padding:0}"注意格式，加{},flex外也加'' -->
                <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div class="detail">
                        <p class="num">￥{{item.value}}</p>
                        <p class="txt">￥{{item.name}}</p>
                    </div>
                </el-card>
                <el-card class="chart1" style="height:280px">
                    <!-- <div style="height:280px" ref="echarts"></div> -->
                    <commonEcharts :chartData="echartData.order" style="height:280px"></commonEcharts>
                </el-card>
                <div class="graph">
                    <el-card style="height: 260px">
                        <!-- <div style="height: 240px" ref="Userecharts"></div> -->
                        <commonEcharts :chartData="echartData.user" style="height:240px"></commonEcharts>
                    </el-card>
                    <el-card style="height: 260px">
                        <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
                        <commonEcharts :chartData="echartData.video" :isAxisChart="false" style="height:240px"></commonEcharts>
                    </el-card>
                </div>
            </div>
        </el-col>
    </el-row>
  </template>
  
  <script>
  import { getData } from '../../api/data' 
    // echarts 5版本的引入要用 * as的形式引入
//   import * as echarts from 'echarts'
  import commonEcharts from '../../src/components/commonEcharts.vue'
  export default {
      name:'homePage',
      components:{
        commonEcharts
      },
      data() {
        return {
            // 不加.png报错
            userImg:require('@/assets/images/user.png'),
            tableData:[],
            tableLabel:{
                name: '课程',
                todayBuy:'今日购买',
                monthBuy:'本月购买',
                totalBuy:'总购买'
            },
            countData: [
                {
                name: "今日支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "今日收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "今日未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
                {
                name: "本月支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "本月收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "本月未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
            ],
            echartData:{
                order:{
                    xData:[],
                    series:[]
                },
                user:{
                    xData:[],
                    series:[]
                },
                video:{
                    series:[]
                }
            }
        }
    },
    mounted(){
        // .then拿到响应
        getData().then(res => {
            const {code,data} = res.data
            if (code === 20000){
                this.tableData = data.tableData
                const order = data.orderData
                const xData = order.date
                // 取order.data[0]的key值作为series中图例的名字 Object.keys()返回一个数组
                const keyArray = Object.keys(order.data[0])
                const series = []
                keyArray.forEach(key => {
                    series.push({
                        name:key,
                        // 注意：key是键，item[key]是其对应的值 map遍历返回新数组
                        data:order.data.map(item => item[key]),
                        type:'line'
                    })
                })

                // const option = {
                //     xAxis: {
                //         data: xData
                //     },
                //     yAxis: {},
                //     legend:{
                //         data:keyArray
                //     },
                //     series
                // }
                this.echartData.order.xData = xData
                this.echartData.order.series = series

                // const E = echarts.init(this.$refs.echarts)
                // E.setOption(option)
                // 用户图
                // const userOption = {
                //     legend: {
                //         // 图例文字颜色
                //         textStyle: {
                //         color: "#333",
                //         },
                //     },
                //     grid: {
                //         left: "20%",
                //     },
                //     // 提示框
                //     tooltip: {
                //         trigger: "axis",
                //     },
                //     xAxis: {
                //         type: "category", // 类目轴
                //         data: data.userData.map(item =>item.date),
                //         axisLine: {
                //         lineStyle: {
                //             color: "#17b3a3",
                //         },
                //         },
                //         axisLabel: {
                //         interval: 0,
                //         color: "#333",
                //         },
                //     },
                //     yAxis: [
                //         {
                //         type: "value",
                //         axisLine: {
                //             lineStyle: {
                //             color: "#17b3a3",
                //             },
                //         },
                //         },
                //     ],
                //     color: ["#2ec7c9", "#b6a2de"],
                //     series: [
                //         {
                //             name:'新增用户',
                //             data: data.userData.map(item =>item.new),
                //             type:'bar'
                //         },
                //         {
                //             name:'活跃用户',
                //             data: data.userData.map(item =>item.active),
                //             type:'bar'
                //         }

                //     ],
                // }
                this.echartData.user.xData = data.userData.map(item =>item.date)
                this.echartData.user.series = [
                        {
                            name:'新增用户',
                            data: data.userData.map(item =>item.new),
                            type:'bar'
                        },
                        {
                            name:'活跃用户',
                            data: data.userData.map(item =>item.active),
                            type:'bar'
                        }

                    ]
                //     // 注意是$refs,加s
                // const U = echarts.init(this.$refs.Userecharts)
                // U.setOption(userOption)

                // 饼图
                // const videoOption = {
                //     tooltip: {
                //         trigger: "item",
                //     },
                //     color: [
                //         "#0f78f4",
                //         "#dd536b",
                //         "#9462e5",
                //         "#a6a6a6",
                //         "#e1bb22",
                //         "#39c362",
                //         "#3ed1cf",
                //     ],
                //     series: [
                //         {
                //             data:data.videoData,
                //             type:'pie'
                //         }
                //     ],
                // }
                // const V = echarts.init(this.$refs.videoEcharts)
                // V.setOption(videoOption)
                this.echartData.video.series = [
                        {
                            data:data.videoData,
                            type:'pie'
                        }
                    ]
            }
            console.log(res);
        })
    }
  
  }
  </script>
  
  <style lang="less">

  
  </style>