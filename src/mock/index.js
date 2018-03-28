import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers } from './data/user'
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
  }
}