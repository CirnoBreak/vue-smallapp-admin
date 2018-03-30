import Mock from 'mockjs'

const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    name: '张某某'
  },
  {
    id: 2,
    username: 'admin1',
    password: '1234567',
    name: '李某某'
  }
]

const UsersInfo = []
for (let i = 0; i < 500; i++) {
  UsersInfo.push(Mock.mock({
    id: Mock.mock('@id').slice(0, 10),
    name: Mock.Random.cname(),
    'age|20-22': 1,
    sex: Mock.Random.integer(0, 1),
    grade: Mock.Random.integer(0,6),
    phone: Mock.mock('@id').slice(0, 11)
  }));
}
export { LoginUsers, UsersInfo }