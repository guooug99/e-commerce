import Mock from 'mockjs'
export default {
  getMenu: config => {
    console.log(config);
    const { username, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/index'
              // url: 'home'

            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'mall/index'
              // url: 'mall'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              // 按index.js来的，老师的是User
              url: 'user/index'
              // url: 'user'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  // 子路由要调用到.vue?去掉试一试
                  url: 'other/pageOne.vue'
                  // url: 'other/pageOne'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'other/pageTwo.vue'
                  // url: 'other/pageTwo'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/video',
              name: 'video',
              label: '商品管理',
              icon: 'video-play',
              url: 'mail/index'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}
