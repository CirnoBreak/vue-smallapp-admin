import Login from './components/Login.vue'
import Admin from './components/Admin.vue'
let routes = [
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      title: '登录',
      allowBack: false
    },
    hidden: true
  }, {
    path: '/',
    component: Admin,
    name: '一',
    meta: {
      title: '管理员'
    },
    iconCls: 'el-icon-message', //图标样式class
    children: [
      { path: '/main', component: Admin, name: '主页', hidden: true },
      { path: '/table', component: Admin, name: 'Table' },
      { path: '/form', component: Admin, name: 'Form' },
      { path: '/user', component: Admin, name: '列表' },
  ]
  }
]

export default routes