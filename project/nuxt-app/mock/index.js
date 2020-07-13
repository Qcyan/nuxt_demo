import Mock from 'mockjs'

Mock.mock(/\/demo\/test/,{
  'code':200,
  'list|1-10':[{
    author: '@first',
    'id|+1':1,
    email:'@EMAIL',
  }]
})
