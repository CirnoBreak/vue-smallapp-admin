import Login from './components/Login.vue'
import Admin from './components/Admin.vue'
import List from './components/List.vue'
import ListChart from './components/ListChart.vue'
import Homework from './components/homework.vue'
import HomeworkList from './components/HomeworkList.vue'
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
    name: '学生列表',
    meta: {
      title: '后台管理'
    },
    iconCls: 'el-icon-tickets', //图标样式class
    children: [
      { path: '/', component: List, name: '学生列表' },
      { path: '/stuChart', component: ListChart, name: '学生图表'}
  ]
  },
  {
    path: '/',
    component: Admin,
    name: '作业发布',
    meta: {
      title: '后台管理'
    },
    iconCls: 'el-icon-message', //图标样式class
    children: [
      { path: '/homework', component: Homework, name: '作业发布' },
      { path: '/homeworkList', component: HomeworkList, name: '作业列表' },
  ]
  }
]

export default routes