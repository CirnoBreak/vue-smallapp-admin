import Login from '../components/Login.vue'
import Admin from '../components/Admin.vue'
import StuList from '../components/stu/StuList.vue'
import StuListChart from '../components/stu/StuListChart.vue'
import HomeworkRelease from '../components/HomeworkRelease.vue'
import HomeworkList from '../components/HomeworkList.vue'
let routes = [
  {
    path: '/login',
    component: Login,
    name: '登录',
    meta: {
      title: '登录',
      allowBack: false
    },
    hidden: true
  }, {
    path: '/',
    component: Admin,
    name: '学生信息',
    meta: {
      title: '后台管理'
    },
    iconCls: 'el-icon-tickets', //图标样式class
    children: [
      {
        path: '/stuList',
        component: StuList,
        name: '学生列表'
      }, {
        path: '/stuChart',
        component: StuListChart,
        name: '学生图表'
      }
    ]
  }, {
    path: '/',
    component: Admin,
    name: '作业管理',
    meta: {
      title: '后台管理'
    },
    iconCls: 'el-icon-message', //图标样式class
    children: [
      {
        path: '/homework',
        component: HomeworkRelease,
        name: '作业发布'
      }, {
        path: '/homeworkList',
        component: HomeworkList,
        name: '作业列表'
      }
    ]
  }, {
    path: '*',
    hidden: true,
    redirect: {
      path: '/404'
    }
  }
]

export default routes