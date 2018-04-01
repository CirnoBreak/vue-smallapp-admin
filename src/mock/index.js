import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, StudentsInfo } from './data/user'
import { Homework } from './data/homework'
let _StudentsInfo  = StudentsInfo
let _Homework = Homework

export default {
  bootstrap() {
    let mock = new MockAdapter(axios)
    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });
    //登录
    mock.onPost('/login')
      .reply(config => {
        let {username, password} = JSON.parse(config.data);
        return new Promise((resolve, reject) => {
          let user = null;
          setTimeout(() => {
            let hasUser = LoginUsers.some(u => {
              if (u.username === username && u.password === password) {
                user = JSON.parse(JSON.stringify(u));
                user.password = undefined;
                return true;
              }
            });
  
            if (hasUser) {
              resolve([
                200, {
                  code: 200,
                  msg: '登录成功',
                  token: 'ldskj2lkj',
                  user
                }
              ]);
            } else {
              resolve([
                200, {
                  code: 500,
                  msg: '账号或密码错误'
                }
              ]);
            }
          }, 1000);
        });
      });
    //获取学生列表
    mock.onGet('/student/list').reply(() => {
      let mockStudents = _StudentsInfo
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            students: mockStudents
          }]);
        }, 1000);
      });
    });

    //获取学生列表（分页）
    mock.onGet('/student/listpage').reply(config => {
      let {page, name, grade} = config.params;
      let mockStudents = _StudentsInfo.filter(students => {
        if (name && students.name.indexOf(name) == -1) return false;
        if (grade && students.grade.toString().indexOf(grade) == -1) return false;
        return true;
      }).sort((a, b) => a['grade'] - b['grade']);
      let total = mockStudents.length;
      mockStudents = mockStudents.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            students: mockStudents
          }]);
        }, 1000);
      });
    });

    //获取作业列表（分页）
    mock.onGet('/homework/listpage').reply(config => {
      let {page, title, grade} = config.params;
      let mockHomework = _Homework.filter(hw => {
        if (title && hw.title.indexOf(title) == -1) return false;
        if (grade && hw.grade.toString().indexOf(grade) == -1) return false;
        return true;
      }).sort((a, b) => new Date(b['date']) - new Date(a['date']));
      let total = mockHomework.length;
      mockHomework = mockHomework.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            homework: mockHomework
          }]);
        }, 1000);
      });
    });

    //编辑作业
    mock.onGet('/homework/edit').reply(config => {
      let { id, title, content } = config.params;
      _Homework.some(u => {
        if (u.id === id) {
          u.title = title;
          u.content = content;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //删除作业
    mock.onGet('/homework/remove').reply(config => {
      let { id } = config.params;
      _Homework = _Homework.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });
    // 发布作业
    mock.onGet('/homework/add').reply(config => {
      let { title, content, grade, date } = config.params;
      _Homework.push({
        title: title,
        content: content,
        grade: grade,
        date: date
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });
  }
}
