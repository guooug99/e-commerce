import axios from 'axios'
import config from '../config'

// 判断当前运行环境  process.env.NODE_ENV拿到当前环境变量 development是开发环境
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

// 在这个工具类（的实例对象）拿到url地址后，配置axios的相关信息
class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    // 定义axios相关配置，在生成axios实例的时候，会传入相关配置，在这个方法里定义这个配置的初始值
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            // 请求的请求头信息
            header: {}
        }
        return config
    }

    // 拦截器相关函数 instance就是axios的一个实例
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            console.log(response, 'response');
            // 对响应数据做点什么
            return response;
        }, function (error) {
            console.log(error, 'error');
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    // 后续在进行接口请求的时候，就会调用这个request函数，该函数会接收一个相关配置 【这部分就是之前学的axios 发送AJAX请求】
    request(options) {
        // 进行对axios实例的创建
        const instance = axios.create()
        options = { ...this.getInsideConfig(), ...options }
        // 调用拦截器
        this.interceptors(instance)
        return instance(options)
    }
}

// 对外暴露这个工具类的实例对象
export default new HttpRequest(baseUrl)