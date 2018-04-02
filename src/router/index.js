import Login from '../components/Login.vue'
import Admin from '../components/Admin.vue'
import StuList from '../components/stu/StuList.vue'
import StuListChart from '../components/stu/StuListChart.vue'
import HomeworkList from '../components/homework/HomeworkList.vue'
import AddHomework from '../components/homework/AddHomework.vue'
import NoticeList from '../components/notice/NoticeList.vue'
import AddNotice from '../components/notice/AddNotice.vue'
import NotFound from '../components/404.vue'
let routes = [
  {
    path: '/login',
    component: Login,
    name: '登录',
    hidden: true
  }, {
    path: '/',
    component: Admin,
    name: '学生信息',
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
    iconCls: 'el-icon-document', //图标样式class
    children: [
      {
        path: '/homework',
        component: AddHomework,
        name: '作业发布'
      }, {
        path: '/homeworkList',
        component: HomeworkList,
        name: '作业列表'
      }
    ]
  }, {
    path: '/',
    component: Admin,
    name: '通知管理',
    iconCls: 'el-icon-message', //图标样式class
    children: [
      {
        path: '/notice',
        component: AddNotice,
        name: '通知发布'
      }, {
        path: '/noticeList',
        component: NoticeList,
        name: '通知列表'
      }
    ]
  }, {
    path: '*',
    hidden: true,
    component: NotFound,
    name: '页面不存在',
  }
]

export default routes