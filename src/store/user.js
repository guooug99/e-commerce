import Cookie from "js-cookie"
// Cookie类比localStorage和sessionStorage的用法
export default {
    state: {
        token: ''
    },
    mutations: {
        // 设置token
        setToken(state, val) {
            state.token = val
            // 第一个参数是cookie的名称，第二个参数是传入的值，这样就在Cookie中生成了这样一组数据，将token进行缓存在cookie里
            Cookie.set('token', val)
        },
        // 清除token的方法
        clearToken(state) {
            // 清除token
            state.token = ''
            Cookie.remove('token')
        },
        // 获取token
        getToken(state) {
            // 如果当前的缓存中有token就直接获取，如果没有从state里获取（说反了？应该是的）
            state.token = state.token || Cookie.get('token')
        }
    }
}