import Mock from 'mockjs'

const Notice = []

for (let i = 0; i < 50; i++) {
  Notice.push(Mock.mock({
    id: Mock.Random.guid(),
    title: Mock.Random.csentence(),
    content: Mock.Random.cparagraph(),
    date: Mock.Random.datetime(),
    grade: Mock.Random.integer(0,6)
  }))
}

export { Notice }