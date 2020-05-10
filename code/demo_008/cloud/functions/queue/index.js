// 云函数入口文件
const cloud = require('wx-server-sdk')
const method = require('./method')

cloud.init({
  env: 'dev-enjcr'
})

exports.db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { action, params } = event
  let res = {}
  switch(action) {
    case 'enqueue':
      res = await method.enqueue(params)
    break;
    case 'dequeue':
      res = await method.dequeue(params)
    break;
  }
  return res
}