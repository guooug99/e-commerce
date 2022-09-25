import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/homePage'

Vue.use(VueRouter)

// 解决点击连续点击同一个路由切换报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/mainPage'),
        redirect: '/home',
        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: () => import('../views/home'),
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: () => import('../views/user')
            // },
            // {
            //     path: '/mall',
            //     name: 'mall',
            //     component: () => import('../views/mall')
            // },
            // {
            //     path: '/page1',
            //     name: 'page1',
            //     component: () => import('../views/other/pageOne')
            // },
            // {
            //     path: '/page2',
            //     name: 'page2',
            //     component: () => import('../views/other/pageTwo')
            // },

        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/login')
    }
]


const router = new VueRouter({
    mode: 'history',
    routes

})

export default router