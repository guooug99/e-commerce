import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        // 记录当前选中的路由是哪一项
        currentMenu: null,
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name != 'home') {
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if (result == -1) {
                    state.tabsList.push(val)
                }
            } else {
                state.currentMenu = null
            }
        },
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        // 暂时删了，val
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 动态添加路由的处理
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    // menuArray存入的就是原index.js相关文件数据
                    menuArray.push(...item.children)
                } else {
                    //   component: () => import('../views/home'),
                    item.component = () => import(`../views/${item.url}`)
                    // menuArray存入的就是原index.js相关文件数据
                    menuArray.push(item)
                }
            });
            // 路由的动态添加
            menuArray.forEach(item => {
                // 老师用的addRoute
                router.addRoutes('Main', item)
            })
        }
    }
}