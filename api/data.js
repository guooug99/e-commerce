// 接口请求都写在了这个文件里面
import axios from "./axios";

// 写一个(对)接口的调用
export const getMenu = (param) => {
    return axios.request({
        // 接口相关地址
        url: '/permission/getMenu',
        // 接口请求类型
        method: 'post',
        // 传入参数
        data: param
    })
}

export const getData = () => {
    return axios.request({
        // 接口相关地址
        url: '/home/getData',
        // 接口请求类型
        method: 'post',
    })
}

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        // 发送请求同时传参params
        params
    })
}