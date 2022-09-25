import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'

// Mock.mock()里的相关参数看mock官方文档
// Mock.mock( requestUrl?, requestType?, template|function(options) )
// requestUrl: 要拦截的URL，字符串或正则表达式
// requestType: 要拦截的请求类型，get/post/put/delete/options...
// template: 数据模板
// function(options)：⽣成响应数据的函数，options --> { url, type, body }
Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'post', userApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)




